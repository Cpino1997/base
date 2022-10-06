 //importamos nuestras independencia
 const express = require('express')
 const router = express.Router()
 const authController = require('../controllers/authController')// controlador de authenticacion
 //router get para el index el cual se encuentra protegido con el metodo isAuthenticated
 router.get('/', authController.isAuthenticated, (req,res)=>{
     res.render('index',{user:req.user})// renderizamos el index y utilizamos los usuarios
 })
 // router get para la pagina login
 router.get('/login', (req,res)=>{
     res.render('login',{alert:false})//renderizamos la pagina login 
     //y le pasamos el parametro alert false para el servicio de alertas
 })
 //router get para registro
 router.get('/registro', (req,res)=>{
     res.render('registro')
 })
 //router para los metodos post del authController
 router.post('/registro', authController.registro)
 router.post('/login', authController.login)
 router.get('/logout', authController.logout)
 //exportamos el modulo router
 module.exports = router
 