const { v4: uuidv4 } = require('uuid');

class Band{
    
    constructor(name = 'no-name'){

    this.id = uuidv4(); //identificador unico
    this.name = name;
    this.votes = 0;
    }
}

//Exportar manualmenta para que pueda ser utilzado en otras pantallas
module.exports = Band;
