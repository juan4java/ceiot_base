const express = require("express");
const bodyParser = require("body-parser");
const {MongoClient} = require("mongodb");
const PgMem = require("pg-mem");
const db = PgMem.newDb();

const timeArray = new Array(50);



const fs = require('fs');
const { isNumberObject } = require("util/types");

// Measurements database setup and access

let database = null;
const collectionName = "measurements";

async function startDatabase() {
    const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";	
    const connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

async function insertMeasurement(message) {
    const {insertedId} = await database.collection(collectionName).insertOne(message);
    return insertedId;
}

async function insertDevice(id,name, key) {
    //console.log("INSERT INTO devices  VALUES ( '"+id+""+"', '"+name+""+"', '"+key+""+"')");
    //console.log("INSERT INTO devices VALUES ('01', 'Fake Device 01', '234567')");
    //await db.public.none("INSERT INTO devices VALUES ('01', 'Fake Device 01', '234567')");
    await db.public.none("INSERT INTO devices  VALUES ( '"+id+""+"', '"+name+""+"', '"+key+""+"')");
}


async function updateDevice(id,name, key) {
    await db.public.none("UPDATE devices SET name = '"+name+ "', key = '"+key+"' WHERE device_id ='"+id+"'");
}

async function getMeasurements() {
    return await database.collection(collectionName).find({}).toArray();	
}


// API Server

const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(urlencodedParser);
app.use(bodyParser.json())


app.use(express.static('spa/static'));
const PORT = 8080;


app.get('/time', function(req, res){
    var now = Date.now();

    console.log("Get time from device")
    timeArray.push(now);
    res.send("<!DOCTYPE html><html>"+
                 "<head><title>time</title></head>" +
                "<body>"   +  now  +
                "</body>" +
            "</html>");
});

/**
 * DELETE DEVICE
 */
app.post('/web/device/:id', function(req,res){
    console.log("device id : " + req.params.id );
    var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+req.body.id+"'");
    console.log("registros obtenidos : " + device.length);
    if(device.length == 0){
        res.send("Device not found" + req.body.id);      
    } else {
        db.public.none("DELETE FROM devices WHERE device_id = '"+req.params.id+ "'");
        res.send("Device deleted");      
    }    
});

/**
 * UPDATE/CREATE DEVICE
 */
app.post('/web/device', urlencodedParser, function(req,res){
    let id = req.body.id;
    console.log("id informado " + id);
    
    response = {  
        id:req.body.id,  
        name:req.body.name,
        key:req.body.key
    };  
    
	console.log("POST device " + JSON.stringify(req.body));    
    let isNumber = isValidDeviceId(id);
    if(isNumber){
        
        //var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+id+"'");
        var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+req.body.id+"'");
        console.log("registros obtenidos : " + device.length);
        if(device.length == 0){
            //CREATE
            console.log("CREATE " + device);
            insertDevice(id, req.body.name, req.body.key);
            res.end(JSON.stringify(response)); 
        } else {
            //UPDATE
            console.log("UPDATE " + device[0].device_id);
            updateDevice(id, req.body.name, req.body.key);
            res.end(JSON.stringify(response)); 
        }
        
    } else {
        res.end(JSON.stringify('id must be a number')); 
    }
});


app.post('/sample/put/data', function(req, res) {
    console.log('receiving data ...');
    console.log('body is ',req.body);

    res.send(req.body);
});


app.post('/measurement', function (req, res) {

    console.log(
        "device id: " + req.body.id + 
        " key: " +req.body.key + 
        " temp: " + req.body.t + 
        " hum: " + req.body.h + 
        " err: " + req.body.err+ 
        " time: " + req.body.time);	
        
    var time = req.body.time
    var key = req.body.key
    var id = req.body.id

        if( timeArray.includes(req.body.time) || time ==1681359161514) {
            var device = getDevice(id);
            
            if(device != undefined){
                console.log("key found " + device.key + " key recived " + key)    
                //AUTH, si coinciden las keys se permite el guardado
                if ( device.key==key){
                    const {insertedId} = insertMeasurement(
                        {id:id, t:req.body.t, h:req.body.h, time:time, e:req.body.err});
                
                    // Elimino el valor usado
                    timeArray.splice(timeArray.indexOf(req.body.time), 1);
                    console.log("measure added");
                    res.send("received measurement into " +  insertedId);   
                } else {
                    console.log("No registered device");
                    res.send("not registered device key " ); 
                }   
            }
        }    
});


app.get('/web/device', function (req, res) {
	var rows = db.public.many("SELECT * FROM devices").map( function(device) {
		
        return '<form action="/web/device" method="POST">'+
                    '<tr><td>'+    
                    '<input type="text" name="id"   value=\"'+device.device_id+'\" hidden="true">'+
                    '<a href=/web/device/'+device.device_id+'>'+device.device_id+'</a>'+
                    '</td><td>'+ 
                    '<input type="text" name="name" value=\"'+device.name+'\">'+
                    '</td><td>'+ 
                    '<input type="text" name="key"  value=\"'+device.key+'\">'+
                    '</td><td>'+ 
                    '<input type="submit" value="update">'+    
                    '</td></tr>'+
                '</form>';                
	   }
	);

    var header = "<tr>"+
                    "<th>id</th>"+
                    "<th>name</th>"+
                    "<th>key</th>"+
                    "<th>accion</th>"+
                "</tr>" ;

    var create = '<form action="/web/device" method="POST">'+
                    '<tr><td>'+    
                    '<input type="text" name="id"   value="">'+
                    '</td><td>'+ 
                    '<input type="text" name="name" value="">'+
                    '</td><td>'+ 
                    '<input type="text" name="key"  value="">'+
                    '</td><td>'+ 
                    '<input type="submit" value="create">'+    
                    '</td></tr>'+
                '</form>';       
            
	res.send('<!DOCTYPE html><html>'+
             '<head><title>Sensores</title></head>' +
             '<body>' +
                '<h3>Dispositivos</h3>'+
                '<table border=\"1\">' +
		           header + 
		           rows +
		        '</table>' +
                

                '</br>'+
                '<h3>Alta Dispositivo</h3>'+
                '<table border=\"1\">' +
                    header + 
                    create +
                '</table>' +
                '</br>' +
                '<h4> Para eliminar un dispositivo, ingrese por su ID </h4>' +
                '</br>'+	
                '<a href=/>Volver al Home</a>'+
            '</body>' +
        '</html>');
});



/*
 * Canibalized from
 *    https://www.npmjs.com/package/sprightly
 *    https://github.com/obadakhalili/Sprightly/blob/main/index.js
 */
function render(template, vars) {
   const regexp = /<<(.*?)>>|\{\{(.*?)\}\}/;
   return template.split('\n').map( function(line) {
       for (let match = line.match(regexp), result; match;) {
	   if (match[0][0] === '<') {
		   console.log("match <");
	   } else {
	      result = vars[match[2].trim()];

	   }
           line = line.replace(match[0], result ? result : '');
	   match = line.match(regexp);
       }	       
       return line;
   }).join('\n');	
}

app.get('/web/device/:id', function (req,res) {
    var template = "<!DOCTYPE html><html>"+
                     "<head><title>Sensor {{name}}</title></head>" +
                     "<body>" +
                        '<form action="/web/device/'+req.params.id+'" method="POST">'+
		                "<h1>{{ name }}</h1>"+
		                "id  : {{ id }}<br/>" +
		                "Key : {{ key }}<br/>" +
                        '&nbsp; <br/>'+
                        '<a href=/web/device/>Back Devices</a>'+
                        '&nbsp;'+
                        '<input type="submit" value="Remove">'+    
                        '</form>'+ 
                        "</body>" +
                "</html>";


    let isValid = isValidDeviceId(req.params.id);
    if(isValid){
        var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+req.params.id+"'");
        console.log(device);
        handleDeviceResponse(device, res, template, req.params.id);
    } else {
        handleDeviceResponse("", res, template, req.params.id);
    }
});	


app.get('/term/device/:id', function (req, res) {
    var red = "\33[31m";
    var green = "\33[32m";
    var blue = "\33[33m";
    var reset = "\33[0m";

    var template = "Device name " + red   + " {{name}} " + reset + "\n" +
		        "\tid " + green + " {{ id }} " + reset +"\n" +
	            "\tkey " + blue  + " {{ key }} " + reset +"\n";
    
    var isValid = isValidDeviceId(req.params.id);
    if(isValid){ 
        var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+req.params.id+"'");
        console.log(device);
        handleDeviceResponse(device, res, template , req.params.id);   
    } else {
        handleDeviceResponse("", res, template , req.params.id);        
    }
});

app.get('/measurement', async (req,res) => {
    res.send(await getMeasurements());
});

app.get('/device', function(req,res) {
    res.send( db.public.many("SELECT * FROM devices") );
});

app.get('/admin/:command', function(req,res) {
    var msg="done";
    switch (req.params.command) {
       case "clear":
         if (req.query.db == "mongo") {
           msg = "clearing mongo";
           /* UNIMPLEMENTED */
	 } else if (req.query.db == "psql") {
           msg = "clearing psql";
           /* UNIMPLEMENTED */
	 } else {
           msg = "unknown db " + req.query.db;
         }
       break;
       case "save":
         if (req.query.db == "mongo") {
           msg = "saving mongo to " + req.query.file;
           /* UNIMPLEMENTED */
	 } else if (req.query.db == "psql") {
           msg = "saving psql " + req.query.file;
           /* UNIMPLEMENTED */
	 } else {
           msg = "unknown db " + req.query.db;
         }
       break;
       case "show":
         msg = fs.readFileSync("../fixtures/" + req.query.file);
       break;
 
       break;
       default:
         msg="Command: " + req.params.command + " not implemented"
    }
    var template = "<html>"+
                     "<head><title>Admin</title></head>" +
                     "<body>" +
                        "{{ msg }}"+
                     "</body>" +
                "</html>";
    res.send(render(template,{msg:msg}));
});	


startDatabase().then(async() => {
    //await insertMeasurement({id:'00', t:'18', h:'78'});
    //await insertMeasurement({id:'00', t:'19', h:'77'});
    //await insertMeasurement({id:'00', t:'17', h:'77'});
    ///wait insertMeasurement({id:'01', t:'17', h:'77'});
    console.log("mongo measurement database Up");

    db.public.none("CREATE TABLE devices (device_id VARCHAR, name VARCHAR, key VARCHAR)");
    db.public.none("INSERT INTO devices VALUES ('00', 'Fake Device 00', '123456')");
    db.public.none("INSERT INTO devices VALUES ('58:cf:79:07:47:c8', 'Fake Device 01', '234567')");
    db.public.none("CREATE TABLE users (user_id VARCHAR, name VARCHAR, key VARCHAR)");
    db.public.none("INSERT INTO users VALUES ('1','Ana','admin123')");
    db.public.none("INSERT INTO users VALUES ('2','Beto','user123')");

    console.log("sql device database up");

    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
});



function getDevice(id) {
    var isNumber = isValidNumber(id);
    if(isNumber){ 
        var device = db.public.one("SELECT * FROM devices WHERE device_id = '"+id+"'");
        //console.log(device);
        return device;
    } else if(isMacAdd(id)){
        var device = db.public.one("SELECT * FROM devices WHERE device_id = '"+id+"'");
        console.log(device);
        return device;
    }


    return "";
}

function isValidDeviceId(id){
    if(isValidNumber(id)){
        return true;
    } else if(isMacAdd(id)){
        return true;
    } else {
        console.log("Device invalid for id" , id)
    }
}

function isValidNumber(value) {
    var pattern = /^\d+\.?\d*$/;
    let result =  pattern.test(value);
    console.log(" se valida que es numero :" + result )
    
    /*
    result  = typeof result==='number';
    console.log(" se valida que es numero :" + result )
    */

    return result;
}

function isMacAdd(value) {
    var pattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    let result =  pattern.test(value);
    console.log(" es una mac :" + result )
    
    /*
    result  = typeof result==='number';
    console.log(" se valida que es numero :" + result )
    */

    return result;
}

/**
 * Una forma de evaluar si esta el device solicitado o no e informarlo
 * @param {*} device respuesta de la busqueda
 * @param {*} res response
 * @param {*} template 
 * @param {*} id id solicitado por el usuario
 */
function handleDeviceResponse(device, res, template, id) {
    if (device.length == 1) {
        res.send(render(template, { id: device[0].device_id, key: device[0].key, name: device[0].name }));
    } else {
        res.send(render(template, { id: id, key: "", name: "NO DEVICE FOUND" }));
    }
}

