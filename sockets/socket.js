//Creamos la variable en io 
const {io} = require('../index');

//Mensajes de sockets
io.on('connect', client => {
    console.log('Cliente conectado')
    
    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });
    
    //Escucha eventos ejemplo: por "consola"
    client.on('mensaje', (payload)=>{
        console.log('Mensaje!!', payload);
    });

    //Emite un mensaje, muestra un mensaje
    io.emit('mensaje', {admin: 'Nuevo mensaje'});
  });