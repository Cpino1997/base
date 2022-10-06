//declaramos las variables de la app
const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const app = express()
//seteamos el motor de plantillas
app.set('view engine', 'ejs')
// indicamos el uso de la carpeta public
app.use(express.static('public'))
// para usar los datos de formularios
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//variables de entorno
dotenv.config({path:'./env/.env'})
app.use(cookieParser())
//llamar al router
app.use('/', require('./routes/router'))
//inicio de la app
app.use(function(req, res, next){
    if(!req.user)
    res.header('Cache-Control','private , no-cache, no-store, must-revalidate');
    next();
});
//definimos el puerto a utilizar
app.listen(3000,()=>{
    console.log('servidor funcionando en http://localhost:3000')
});

