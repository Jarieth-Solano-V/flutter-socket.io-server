//Constante express
const express = require('express');
//Constante path 
const path = require('path');

//Me llama a las variables de entorno 
require('dotenv').config();

//Aplicacion de express
const app = express();

//Node Server
const server = require('http').createServer(app);

//Exportamos el io que definimos en la carpeta de socket
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

/*Path publico, conectamos a la carpeta public,  
ejecutamos el "index" creado en html*/
const publicPath = path.resolve(__dirname, 'public');

/*La aplica va utilizar de manera statica la variable public,
 la cual muestra el la carpeta "Public" */
app.use(express.static(publicPath));


/*La aplicaacion va escuhar le puerto 3000 y muertra un mensaje de error*/
/*process.env.PORT l app va escuhar ese puerto 
y si lo corremos en otro dominio este va aparacer este mismo*/ 
server.listen(process.env.PORT, (err)=>{

    if(err) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT);
});
