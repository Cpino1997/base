// archivo bd.js
const mysql = require('mysql')
const conn = mysql.createConnection({ 
host : process.env.DB_HOST, //procesamos el archivo .env con doenv que contiene las credenciales 
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
