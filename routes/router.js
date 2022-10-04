const express = require('express')
const router = express.Router()
//router para las vistas
router.get('/', (req,res)=>{
    res.render('index')
})

module.exports = router