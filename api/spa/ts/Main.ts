interface DeviceInt {
  device_id:string;
  name: string;
  key:string;
}

class Main implements EventListenerObject, GETResponseListener {

  api = new API();
  view = new ViewMainPage();
  devices:DeviceInt[];

  constructor(){
    
  }

  handleGETResponse(status:number, response:string):void {
    this.devices= JSON.parse(response);
    this.view.showDevices(this.devices,this);
  }


  handlePOSTResponse(status:number, response:string):void {
    console.log(response)
    // this.devices= JSON.parse(response);
    // this.view.showDevices(this.devices,this);
  }

  main():void {
      this.apiGetDevice()
      document.getElementById("boton").addEventListener("click",this);
      document.getElementById("boton-edit").addEventListener("click",this);
  }

  handleEvent(evt:Event):void{
	  
    let target = <HTMLElement>evt.target;
    let type   = evt.type;
            
    if (target.id=="boton") {
      this.apiGetDevice()
      console.log("handling boton");
    } else if (target.id=="boton-edit") {
       this.apiDeleteDevice()
      console.log("handling boton-edit boton");
    } else {
      console.log("NO handling edit boton", target.id);  
    }
   
  }

  private apiGetDevice(){
    this.api.requestGET("device",this);
  }

  private apiDeleteDevice(){
    var response = this.api.requestPOST("/web/device/00",this);
    alert("Se intento eliminar : " + response)
  }
}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
