//declaramos las variables de la app
const express = require('express')

const app = express()

//seteamos el motor de plantillas
app.set('view engine', 'ejs')
// indicamos el uso de la carpeta public
app.use(express.static('public'))

// para usar los datos de formularios
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//llamar al router
app.use('/', require('./routes/router'))


//definimos el puerto a utilizar
app.listen(3000,()=>{
    console.log('servidor funcionando en http://localhost:3000')
})