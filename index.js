const express = require("express");
const cors = require("cors");

const { conection } = require("./database/conection.js");
const userRoute = require("./routes/user.js");

const app = express();

app.set('PORT', process.env.PORT || 3001);

conection();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ruta para los usuarios
app.use("/api/user", userRoute);

app.listen(app.get('PORT'), ()=>{
    console.log(`Servidor corriendo en el puerto ${app.get('PORT')}`);
})