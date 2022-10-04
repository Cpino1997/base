
# Guía de implementación JsonWebToken con Express js.

Esta guiá tiene como objetivo enseñar y mostrar una forma de segurizar aplicaciones con JWT.

  

# Requisitos:

- VisualStudioCode.

- Node.js v18.

- Npm v8.

- Ubuntu, puedes usar la terminal en windows para seguir los pasos o directamente instalar wls (https://learn.microsoft.com/es-es/windows/wsl/install).

  

## Pasos:

  

### -Paso 1:

Primero crearemos un directorio, luego inicializaremos un proyecto y por ultimo importaremos los componentes que utilizaremos

y también importaremos las dependencias a utilizar

  

``` bash

$ mkdir nodeapp

$ cd nodeapp

$ npm init -y

$ npm i express bcryptjs cookie-parser dotenv ejs jsonwebtoken mysql

$ sudo npm i -g nodemon

```

  

### -Paso 2:

Crearemos la estructura de nuestro proyecto, o bien podemos clonar el proyecto:

``` bash

$ git clone https://github.com/PinoLabs/base.git

$ cd base

$ npm install

$ node app.js

```

Estructura del Proyecto


``` bash

├── app.js

├── controllers

│ └── authController.js

├── database

│ └── db.js

├── env

├── package.json

├── package-lock.json

├── public

│ ├── css

│ │ ├── bootstrap.min.css

│ │ ├── dashboard.css

│ │ ├── dashboard.rtl.css

│ │ ├── signin.css

│ │ └── style.css

│ └── js

│ ├── bootstrap.min.css

│ └── dashboard.js

├── Readme.md

├── routes

│ └── router.js

└── views

├── index.ejs

├── login.ejs

└── registro.ejs

```


### -Paso 3:
Configuraremos nuestro enviroment para conectar la base de datos, para ello necesitamos ir al archivo env/.env
en el configuraremos nuestras variables de conexión:
 DB_HOST, 
 DB_USER, 
 DB_PASS, 
 DB_HOSTNAME,
 JWT_SECRETO, // secreto
 JWT_TIEMPO_EXPIRA, // tiempo de expiración del token.
 JWT_COOKIE_EXPIRES //tiempo de expiración de la cookie.
 
<img src="https://drive.google.com/uc?export=view&id=13IyKO-7UvVgaBPlERvoDcxJfVILKx1dZ">

Con esto ya tenemos nuestra base de datos conectada.

### -Paso 4:
Comenzaremos a trabajar en los archivos vacíos.

el primer archivo a modificar sera router.js
```js
//imports
const express = require('express')
const router = express.Router()

//router para el index
router.get('/',(req,res)=>{
    res.render('index')
})
//router para el login
router.get('/login', (req,res)=>{
    res.render('login')
})
//router para el registro
router.get('/registro', (req,res)=>{
    res.render('registro')
})
module.exports = router
```
luego en nuestro archivo db.js ingresaremos los siguentes codigos

```js
const mysql = require('mysql')

const conn = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
})

conn.connect( (error)=>{
    if(error){
        console.log('El error es :'+error)
        return
    }
    console.log('Contectado!')
})

module.exports = conn
```
con esto al arrancar la aplicación podremos ingresar a /login / registro y / para ingresar al index
ahora editaremos nuestros templates para que se vean mas bonitos y agregaremos el componente de alertas

login.ejs
```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Pinolabs and Bootstrap contributors">
    <title>Test JWT</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/signin.css" rel="stylesheet">
  </head>
  <body class="text-center">
    
<main class="form-signin text-center shadow-lg ">
  <form id="formLogin" action="/login" method="post">
    <img alt="logo" class="thumb" data-pin-no-hover="true" src="https://img.freepik.com/iconos-gratis/usb_318-926247.jpg" width="128" height="128">
    <h1 class="h3 mb-3 fw-normal">Ingreso</h1>
<br>
    <div class="form-floating">
      <input type="text" class="form-control" id="user" name="user" placeholder="juanitoJWT">
      <label for="usuario">Usuario</label>
    </div>
    <br>
    <div class="form-floating">
      <input type="password" class="form-control" name="pass" id="pass" placeholder="Contraseña!">
      <label for="pass">Contraseña</label>
    </div>
    <br>
    <button class="w-100 btn btn-lg btn-primary" type="submit">Ingresar</button>
    
  </form>
  <br>
  <a href="/registro" class="w-100 btn btn-lg btn-bd-primary">Registrarte</a>
  <br>
  <p class="mt-5 mb-3 text-muted">&copy; Pinolabs –2022</p>
</main>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <% if(alert){ %>
      <script>
        Swal.fire({
          title : '<%= alertTitle %>',
          text : '<%=  alertMenssage %>',
          icon : '<%=  alertIcon %>',
          showConfirmButton : <%= showConfirmButton %>,
          timer : <%=  timer %>
        }).then(()=>{
          window.location = '/<%= ruta %>'
        })
      </script>
    <% } %>

</body>
</html>
```
registro.ejs
```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Pinolabs and Bootstrap contributors">
    <meta name="generator" content="Hugo+pinolabs v1.0">
    <title>Test JWT</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/signin.css" rel="stylesheet">
  </head>
  <body class="text-center">
    
<main class="form-signin text-center shadow-lg ">
  <form id="formLogin" action="/registro" method="post">
    <img class="thumb" alt="logo" data-pin-no-hover="true" src="https://img.freepik.com/iconos-gratis/usb_318-926247.jpg" width="128" height="128">
    <h1 class="h3 mb-3 fw-normal">Registro</h1>
<br>
    <div class="form-floating">
      <input type="text" class="form-control" id="user" name="user" placeholder="juanitoJWT">
      <label for="user">Usuario</label>
    </div>
    <br>
    <div class="form-floating">
        <input type="email" class="form-control" id="correo" name="correo" placeholder="juanitoJWT@gmail.com">
        <label for="correo">Correo</label>
      </div>
      <br>
    <div class="form-floating">
      <input type="password" class="form-control" id="pass" name="pass" placeholder="Contraseña!">
      <label for="pass">Contraseña</label>
    </div>
    <br>
    <button class="w-100 btn btn-lg btn-bd-primary" type="submit">Registrarte</button>
  </form>
  <br>
  <a href="/login" class="w-100 btn btn-lg btn-primary">Ingresar</a>
  <br>
  <p class="mt-5 mb-3 text-muted">&copy; Pinolabs –2022</p>
</main>

    
  </body>
</html>
```
index.ejs
```html
 <!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="PinoLabs and Bootstrap contributors">
    <title>Admin</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/dashboard.css" rel="stylesheet">
</head>
<body>
<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
<a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">PinoLabs</a>
<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
</button>
<div class="navbar-nav">
    <div class="nav-item text-nowrap">
    <a class="nav-link px-3" href="logout">Salir</a>
    </div>
</div>
</header>
<div class="container-fluid">
    <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div class="position-sticky pt-3 sidebar-sticky">
                <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                    <span data-feather="home" class="align-text-bottom"></span>
                    <h2> <% if(user){ %> <%= user.usuario %> <% } %> </h2>
                    </a>
                </li>
                </ul>
            </div>
        </nav>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Menu Principal</h1>
                <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group me-2">
                    <button type="button" class="btn btn-sm btn-outline-secondary">Upload</button>
                </div>
                </div>
            </div>
        </main>
    </div>
</div>
<script src="js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js" integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE" crossorigin="anonymous"></script><script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js" integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha" crossorigin="anonymous"></script><script src="dashboard.js"></script>
</body>
</html>
```

si intentaron arrancar el login lo mas probable es que les salga error, pues importamos Swing.alert el cual no esta configurado. por lo cual volveremos a router.js y agregaremos las siguentes lineas

```js
const express = require('express')
const router = express.Router()
//router para las vistas
router.get('/', (req,res)=>{
    res.render('index')
})
router.get('/login', (req,res)=>{
//enviamos la alert con valor falso.
    res.render('login',{alert:false})
})


router.get('/registro', (req,res)=>{
    res.render('registro')
})

module.exports = router
```

### -Paso 5:
ahora integraremos nuestro authController para logear nuestro usuario.
```js
//importamos nuestros recursos
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conn = require('../database/db')
const {promisify} = require('util')

//funcion Registro
exports.registro = async (req, res)=>{
   try {
   //variables que se reciben desde el body
      const user = req.body.user;
      const correo = req.body.correo;
      const pass = req.body.pass;
      //encriptamos las contraseñas
      let passHash = await bcryptjs.hash(pass, 8)
      console.log(passHash)
      //ejecutamos una quary en la base de datos para insertar el usuario
      conn.query('INSERT INTO usuarios SET ? ',{usuario:user ,correo:correo, contraseña:passHash},(error , results)=>{
         if(error){console.log(error)}
         //si todo sale bien volveremos a la pagina de inicio
         res.redirect('/')
      })
      } catch (error) {
         console.log(error)
   }
   
}

//metodo Login
exports.login = async (req, res)=>{
   try {
      //obtenemos los datos del dom.
      const user = req.body.user
      const pass = req.body.pass
      //comprobamos que no esten vacios.
      if(!user || !pass){
         // si estan vacios mostraremos una alerta indicando que estan vacios
         res.render('login',{
            alert:true,
            alertTitle:"Error",
            alertMenssage: "porfavor ingrese un usuario y contraseña",
            alertIcon:"info",
            showConfirmButton:true,
            timer: false,
            ruta: 'login'
         })
      }else{
         //si no estan vacios consultamos en la bd si los datos son validos, de no ser validos enviaremos una alerta de error
         conn.query('SELECT * FROM usuarios WHERE usuario = ? ',[user], async (error, results)=>{
            if( results.length == 0 || ! (await bcryptjs.compare(pass,results[0].contraseña))){
               res.render('login',{
                  alert:true,
                  alertTitle:"Error",
                  alertMenssage: "Contraseña Incorrecta >:v",
                  alertIcon:"info",
                  showConfirmButton:true,
                  timer: false,
                  ruta: 'login'
               })
            }else{
               //si los datos son validos entonces crearemos un token para el usuario con duracion de 7d.
               const id = results[0].id
               const token = jwt.sign({id:id}, process.env.JWT_SECRETO,{
                  expiresIn: process.env.JWT_TIEMPO_EXPIRA
               })
							//guardamos nuestras cookies y en ellas nuestro jwt
               const cookiesOptions ={
                  expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES *24 *60 *1000),
                  httpOnly: true
               }
               // mandaremos una alerta de exito y ingresaremos al admin
               res.cookie('jwt', token, cookiesOptions)
               res.render('login',{
                  alert:true,
                  alertTitle:"Exito!",
                  alertMenssage: "Ingreso Exitoso!",
                  alertIcon:"success",
                  showConfirmButton:true,
                  timer: 800,
                  ruta: ''
               })
            }
         })
      }
   } catch (error) {
      console.log(error)
   }
}

//metodo para comprobar si estamos autenticados
exports.isAuthenticated = async (req, res, next)=>{
   //para comprobar esto necesitamos acceder al token que se encuentra en las cookies
   if(req.cookies.jwt){
      try {
         //decodificamos la cookie para comprar los datos con la bd
         const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
         conn.query('SELECT * FROM usuarios WHERE id = ?',[decodificada.id], (error, results)=>{
            if(!results){return next()}
            req.user= results[0]
            return next()
         })
      } catch (error) {
         console.log(error)
         return next()
      }
   }else{
      //si los datos no son validos, los enviaremos a la pagina de login 
      res.redirect('/login')
   }
}
// para salir eliminaremos la cookie del sistema
exports.logout = (req, res) => {
   res.clearCookie('jwt')
   return res.redirect('/')
}
```
agregamos los nuevos metodos post para el router.js

```js
const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

//router get /
router.get('/', authController.isAuthenticated, (req,res)=>{
    res.render('index',{user:req.user})
})

//get login return .ejs
router.get('/login', (req,res)=>{
    res.render('login',{alert:false})
})

//get registro return registro.ejs
router.get('/registro', (req,res)=>{
    res.render('registro')
})

//router para los metodos post del authController
router.post('/registro', authController.registro)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

module.exports = router
```
ahora en app.js debemos agregar las siguentes lineas y quitar de comentarios las demas para que la app pueda funcionar

```js
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

//utilizamos las cookies y las parseamos
app.use(cookieParser())


//llamar al router
app.use('/', require('./routes/router'))
//limpia las cookies al salir
app.use(function(req, res, next){
    if(!req.user)
    res.header('Cache-Control','private , no-cache, no-store, must-revalidate');
    next();
});

//definimos el puerto a utilizar
app.listen(3000,()=>{
    console.log('servidor funcionando en http://localhost:3000')
})
```
Con esto ya tienes todo lo necesario para crear una app con JWT y Express JS