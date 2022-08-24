const { io } = require('../index')

//Creamos la variable en io 
const Band = require('../models/band');
const Bands = require('../models/bands');


//Coleccion de bandas
const bands = new Bands();

 
 //Imprimir las bandas por consula
 bands.addBand(new Band('Queen'));
 bands.addBand(new Band('Metallica'));
 bands.addBand(new Band('Iron Maiden'));
 bands.addBand(new Band('Megadeth'));


 //RECORDAR QUE IO = servidor 
 

 //Mensajes de sockets
io.on('connect', client => {
    console.log('Cliente conectado');

    //Emitimos la funcion de votos
    client.on('vote-band', (payload)=>{
        console.log(payload);
    })

    //Emitimos la lista de bandas 'active-bands'
    client.emit('active-bands', bands.getBands());
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });
    
    //Escucha eventos ejemplo: por "consola"
    client.on('mensaje', (payload)=>{
        console.log('Mensaje', payload);
        io.emit('mensaje', {admin:'Nuevo mensaje'});
    });

client.on('vote-band', (payload)=>{

    bands.voteBand(payload.id);
    io.emit('active-bands', bands.getBands());

});

client.on('add-band', (payload)=>{
    //Creamos la nueva banda para obtener el nombre 
    const newBand = new Band(payload.name);
    //Agregamos la banda 
    bands.addBand(newBand);
    //Obtenemos la banda 
    io.emit('active-bands', bands.getBands());

});


//Escucha el evento 'delete-band', payload = data emitada
client.on('delete-band', (payload)=>{
    //llamamos el eliminar banda y le asignamos el id 
    bands.deleteBand(payload.id);
    //refrescamos, con el io le comunico a todos los clientes conectados
    io.emit('active-bands', bands.getBands());

});
    

    //Emite un mensaje, muestra un mensaje
    //Escuchamos el mensaje 'emitir-mensaje'
    //client.on('emitir-mensaje', (payload) => {
        //console.log(payload);
        //io.emit('nuevo-mensaje', payload);// Lo emite a todos loscliente conectados
       //Luego de escucharlo emiti este 'nuevo-mensaje'
       // client.broadcast.emit('nuevo-mensaje', payload);//Emite a todos menos al que emitio el menjase
    //});

  });