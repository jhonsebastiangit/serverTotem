const mongoose = require("mongoose");

const conection = async () => {
    try {
        const uri = 'mongodb+srv://jhonsebastiangit:mnQjCPlS4zuXjkCc@cluster0.ln6kfur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
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