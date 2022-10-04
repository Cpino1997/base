# Guía de implementación JsonWebToken con Express js.
 Esta guia tiene como objetivo enseñar y mostrar una forma de segurizar aplicaciones con JWT, integrando expiracion.

# Requisitos:
- VisualStudioCode.
- Node.js v18.
- Npm v8.
- Ubuntu, puedes usar la terminal en windows para seguir los pasos o directamente instalar wls (https://learn.microsoft.com/es-es/windows/wsl/install).

## Pasos:

### -Paso 1:
Primero crearemos un directorio, luego inicializaremos un proyecto y por ultimo importaremos los componentes que utilizaremos
y tambien importaremos las dependencias a utilizar

``` sh
$ mkdir nodeapp
$ cd nodeapp
$ npm init -y
$ npm i express bcryptjs cookie-parser dotenv ejs jsonwebtoken mysql
$ sudo npm i -g nodemon
```

### -Paso 2:
Crearemos la estructura de nuestro proyecto, para ello. crearemos la siguente estructura en la carpeta principal, bootstrap pueden instalarlo desde npm o importarlo por cdn.
``` bash
├── app.js
├── controllers
│   └── authController.js
├── database
│   └── db.js
├── env
├── package.json
├── package-lock.json
├── public
│   ├── css
│   │   ├── bootstrap.min.css
│   │   ├── dashboard.css
│   │   ├── dashboard.rtl.css
│   │   ├── signin.css
│   │   └── style.css
│   └── js
│       ├── bootstrap.min.css
│       └── dashboard.js
├── Readme.md
├── routes
│   └── router.js
└── views
    ├── index.ejs
    ├── login.ejs
    └── registro.ejs
``` 
o bien podemos clonar el proyecto:
``` git
$ git clone
$ cd base
$ npm install
$ node app.js
``` 
### -Paso 3: