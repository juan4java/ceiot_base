interface GETResponseListener {
  handleGETResponse(status:number, response:string): void;
}

interface POSTResponseListener {
  handlePOSTResponse(status:number, response:string): void;
}

class API{

  requestGET(url:string, listener: GETResponseListener):void {
    let xhr:XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
          listener.handleGETResponse(xhr.status,xhr.responseText);
        } else {
          listener.handleGETResponse(xhr.status,null);
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send(null);
  }

  requestPOST(url:string, listener: POSTResponseListener):void {
    let xhr:XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        console.log(this.responseText)
        if(xhr.status == 200) {
          listener.handlePOSTResponse(xhr.status,xhr.responseText);
        } else {
          listener.handlePOSTResponse(xhr.status,null);
        }
      }
    };
    xhr.open('POST', url, true);
    xhr.send(null);
  }
}
