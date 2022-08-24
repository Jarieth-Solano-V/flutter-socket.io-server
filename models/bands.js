const Band = require("./band");


//Se maneja coleccion general de las bandas
class Bands {

constructor(){
    this.bands = [];

}

//Agregar una banda 
addBand( band = new Band()){
    this.bands.push(band);
}

//Obtener bandas
getBands(){
    return this.bands;
    
}

//Eliminar banda
deleteBand(id = ''){
    this.bands = this.bands.filter(band => band.id !== id);
   return this.bands;
}

//Obtener votos
voteBand(id = ''){
    this.bands = this.bands.map(band =>{
        if(band.id === id){
            band.votes++;
            return band;
        }else{
            return band;
        }
    });
}

}


module.exports = Bands;