/* HTTP GET Example using plain POSIX sockets

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/
#include <string.h>
#include <stdio.h>

#include <time.h>
#include <sys/time.h>

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "esp_system.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"

#include "nvs_flash.h"

#include "protocol_examples_common.h"

#include "lwip/err.h"
#include "lwip/sockets.h"
#include "lwip/sys.h"
#include "lwip/netdb.h"
#include "lwip/dns.h"

#include <bmp280.h>


#include "esp_sntp.h"

#include "../config.h"

/* HTTP constants that aren't configurable in menuconfig */
#define WEB_PATH "/measurement"
#define WEB_PATH_TIME "/time"

#define MAC_ADDR_SIZE 6

static const char *TAG = "temp_collector";

//TODO Envio la mac, pero por tiempo lo dejo asi, deberia ser 1 valor 
// static char *BODY = "id=%02x:%02x:%02x:%02x:%02x:%02x&key="DEVICE_KEY"&t=%0.2f&h=%0.2f&time=%llu&err=0";
// static char *BODY_ERROR = "id=%02x:%02x:%02x:%02x:%02x:%02x&key="DEVICE_KEY"&err=%s&time=%llu";
static char *BODY = "id="DEVICE_ID"&key="DEVICE_KEY"&t=%0.2f&h=%0.2f&time=%llu&err=0";
static char *BODY_ERROR = "id="DEVICE_ID"&key="DEVICE_KEY"&err=%s&time=%llu";


//TODO Opcion para obtener referencia de tiempo. si no uso SNTP
static char *REQUEST_GET_TIME = "GET "WEB_PATH_TIME" HTTP/1.0\r\n"
    "Host: "API_IP_PORT"\r\n"
    "User-Agent: "USER_AGENT"\r\n";

static char *REQUEST_POST = "POST "WEB_PATH" HTTP/1.0\r\n"
    "Host: "API_IP_PORT"\r\n"
    "User-Agent: "USER_AGENT"\r\n"
    "Content-Type: application/x-www-form-urlencoded\r\n"
    "Content-Length: %d\r\n"
    "\r\n"
    "%s";

int step =0; 

static void http_get_task(void *pvParameters)
{

    const struct addrinfo hints = {
        .ai_family = AF_INET,
        .ai_socktype = SOCK_STREAM,
    };

    struct addrinfo *res;
    struct in_addr *addr;
    int s, r;
    char body[64];
    char recv_buf[64];
    char send_buf[256];

    bmp280_params_t params;
    bmp280_init_default_params(&params);
    bmp280_t dev;
    memset(&dev, 0, sizeof(bmp280_t));

    ESP_ERROR_CHECK(bmp280_init_desc(&dev, BMP280_I2C_ADDRESS_0, 0, SDA_GPIO, SCL_GPIO));
    ESP_ERROR_CHECK(bmp280_init(&dev, &params));

    bool bme280p = dev.id == BME280_CHIP_ID;
    ESP_LOGI(TAG, "BMP280: found %s\n", bme280p ? "BME280" : "BMP280");

    float pressure, temperature, humidity;
    unsigned long long time_fixed = 1681359161514;
    int err = 0;

    // Leo la MAC antes de ir al while
    // uint8_t mac[MAC_ADDR_SIZE];
    // esp_wifi_get_mac(ESP_IF_WIFI_STA, mac);
    // ESP_LOGI("MAC address", "MAC address: %02x:%02x:%02x:%02x:%02x:%02x", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);

// TODO: Pasar la mac a una cadena de texto    
//    char* mac_char = (char*) mac;
//    ESP_LOGI("MAC address", "MAC address: %s", mac_char);
    
    while(1) {
        
         if (bmp280_read_float(&dev, &temperature, &pressure, &humidity) != ESP_OK) {
            ESP_LOGI(TAG, "Temperature/pressure reading failed\n");
            

            // sprintf(body, mac[0], mac[1], mac[2], mac[3], mac[4], mac[5],  BODY_ERROR, "Error Lectura", time_fixed);
            sprintf(body, BODY_ERROR, "Error Lectura", time_fixed);
            
            sprintf(send_buf, REQUEST_POST, (int)strlen(body),body );
            ESP_LOGI(TAG,"sending: \n%s\n",send_buf);

        } else {
            //EN caso de Error, no se pudo leer el sensor informo   
            ESP_LOGI(TAG, 
                "Pressure: %.2f Pa, Temperature: %.2f C , Humidity: %.2f, time : %llu\n",
                pressure, temperature,humidity, time_fixed);

            // sprintf(body, BODY,mac[0], mac[1], mac[2], mac[3], mac[4], mac[5], temperature , humidity , time_fixed);
            sprintf(body, BODY, temperature , humidity , time_fixed);
            sprintf(send_buf, REQUEST_POST, (int)strlen(body),body );
            ESP_LOGI(TAG,"sending: \n%s\n",send_buf);
        }    

        int err = getaddrinfo(API_IP, API_PORT, &hints, &res);

        if(err != 0 || res == NULL) {
            ESP_LOGE(TAG, "DNS lookup failed err=%d res=%p", err, res);
            vTaskDelay(1000 / portTICK_PERIOD_MS);
            continue;
        }

        /* Code to print the resolved IP.
           Note: inet_ntoa is non-reentrant, look at ipaddr_ntoa_r for "real" code */
        addr = &((struct sockaddr_in *)res->ai_addr)->sin_addr;
        ESP_LOGI(TAG, "DNS lookup succeeded. IP=%s", inet_ntoa(*addr));

        s = socket(res->ai_family, res->ai_socktype, 0);
        if(s < 0) {
            ESP_LOGE(TAG, "... Failed to allocate socket.");
            freeaddrinfo(res);
            vTaskDelay(1000 / portTICK_PERIOD_MS);
            continue;
        }
        ESP_LOGI(TAG, "... allocated socket");

        if(connect(s, res->ai_addr, res->ai_addrlen) != 0) {
            ESP_LOGE(TAG, "... socket connect failed errno=%d", errno);
            close(s);
            freeaddrinfo(res);
            vTaskDelay(4000 / portTICK_PERIOD_MS);
            continue;
        }

        ESP_LOGI(TAG, "... connected");
        freeaddrinfo(res);

        if (write(s, send_buf, strlen(send_buf)) < 0) {
            ESP_LOGE(TAG, "... socket send failed");
            close(s);
            vTaskDelay(4000 / portTICK_PERIOD_MS);
            continue;
        }
        ESP_LOGI(TAG, "... socket send success");

        struct timeval receiving_timeout;
        receiving_timeout.tv_sec = 5;
        receiving_timeout.tv_usec = 0;
        if (setsockopt(s, SOL_SOCKET, SO_RCVTIMEO, &receiving_timeout,
                sizeof(receiving_timeout)) < 0) {
            ESP_LOGE(TAG, "... failed to set socket receiving timeout");
            close(s);
            vTaskDelay(4000 / portTICK_PERIOD_MS);
            continue;
        }
        ESP_LOGI(TAG, "... set socket receiving timeout success");

        /* Read HTTP response */
        do {
            bzero(recv_buf, sizeof(recv_buf));
            r = read(s, recv_buf, sizeof(recv_buf)-1);
            for(int i = 0; i < r; i++) {
                putchar(recv_buf[i]);
            }
        } while(r > 0);

        ESP_LOGI(TAG, "... done reading from socket. Last read return=%d errno=%d.", r, errno);
        close(s);

        for(int countdown = 15; countdown >= 0; countdown--) {
            ESP_LOGI(TAG, "%d... ", countdown);
            vTaskDelay(1000 / portTICK_PERIOD_MS);
        }

        ESP_LOGI(TAG, "< Starting again! >");
        
    }
}

// TODO: Esto es una task pero que no voy a usar por ahora
// TaskHandle_t myTaskHandle = NULL;

// void demo(void *arg)
// {
//     while(1){
//         if(step == 1){
//             printf("Message Sent! [%d] \n", xTaskGetTickCount());
//             vTaskDelay(1000/ portTICK_RATE_MS);
//             step = 0;
//         }
//     }
// }

// static void set_mac_address(uint8_t *mac)
// {
//     esp_err_t err = esp_wifi_set_mac(ESP_IF_WIFI_STA, mac);
//     if (err == ESP_OK) {
//         ESP_LOGI("MAC address", "MAC address successfully set to %02x:%02x:%02x:%02x:%02x:%02x", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
//     } else {
//         ESP_LOGE("MAC address", "Failed to set MAC address");
//     }
// }

// TODO LEER LA MAC DESDE ESTA FUNCION
//  static void get_mac_address(void)
// {
//     uint8_t mac[MAC_ADDR_SIZE];
//     esp_wifi_get_mac(ESP_IF_WIFI_STA, mac);
//     ESP_LOGI("MAC address", "MAC address: %02x:%02x:%02x:%02x:%02x:%02x", mac[0], mac[1], mac[2], mac[3], mac[4], mac[5]);
// }


void app_main(void)
{
    ESP_ERROR_CHECK(nvs_flash_init());
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    ESP_ERROR_CHECK(i2cdev_init());

    ESP_ERROR_CHECK(example_connect());

    //TODO manejar multiples bloques
    //xTaskCreate(demo,"demo",4096,NULL,10,&myTaskHandle);

    xTaskCreate(&http_get_task, "http_get_task", 4096, NULL, 5, NULL);
}
