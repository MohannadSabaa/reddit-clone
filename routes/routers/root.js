const express = require('express');
const router = express.Router();
const {home, signUp, login,checkUser,logout, profile, error404} = require('../controllers/root/home');



router
.get('/',home)
.post('/',checkUser)
.get('/register(.html)?', signUp)
.put('/register', signUp)
.get('/profile(.html)?', profile)
.post('/login', login)
.get('/logout', logout)
.all('/*', error404)
module.exports = router;