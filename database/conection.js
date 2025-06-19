const mongoose = require("mongoose");

const conection = async () => {
    try {
        const uri = 'mongodb://localhost:27017/totem_inscripciones_afc';
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        await mongoose.connect(uri, options);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
        throw new Error('No se ha establecido la conexión');
    }
}

module.exports = {
    conection
}