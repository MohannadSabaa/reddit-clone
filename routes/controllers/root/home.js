const {join} = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {signToken} = require('../../../utils/token');
const schema = require('../../../utils/joi');
const connection = require('../../../model/database');
const home = async (req, res) => {
 
    res.status(200).sendFile(join(__dirname, '../../../view/index.html'));
    }
const profile = async (req, res) => {
  res.status(200).sendFile(join(__dirname, '../../../view/profile.html'));
}
const signUp = async (req, res) => {
    res.status(200).sendFile(join(__dirname, '../../../view/register.html'))
}

const login = async (req, res) => {
const {email, password} = req.body;
if(!email || !password) {
  return res.status(403).json({message: 'email and password required'});

}
 const query = await connection.query('SELECT * FROM users  WHERE email = $1', [email]);
 const result = await query.rows;
 if(result.length === 0)
  return res.status(403).json({message: 'Not Found'})
 const validPass = await bcrypt.compare(password, result[0].password);
 if(!validPass)
  return res.status(403).json({message:'Wrong password'});
const user = result[0];
const {id, name, role} = user;
const payload = {id, name, email, role};
const token = jwt.sign(payload, process.env.SECRET_KEY);
res.status(201).cookie('token', token).json({id})
//  if(result)
  // try {
  //   const {email, password} = req.body;
  //   const query = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
  //   const user = await query.rows;

  //   if(!email) throw new Error('Wrong Email');

  //   const validPass = await bcrypt.compare(password, user[0].password);
  //  if(!validPass) throw new Error('Wrong Password');

  //  if(user[0].email && validPass && user[0].role === 'admin') {
  //   const token = jwt.sign({id: user[0].id, email, role: user[0].role}, process.env.SECRET_KEY);
  //   res.status(200).cookie('admin_token', token).redirect('/');
  //  }
   
  //  if(user[0].email && validPass) {
  //      const token = jwt.sign({id:user[0].id, name: user[0].name, email, role: user[0].role}, process.env.SECRET_KEY);
  //      res.status(200).cookie('token',token).json({user: user[0].rows.id})

  //  }
  // }
  // catch (error) {
  //   res.status(402).json('Email and Password Required')
  // }

}

const checkUser = async (req, res) => {
  if(req.cookies.token) {
    const {token} = req.cookies;
    const valid = await jwt.verify(token,process.env.SECRET_KEY);
    console.log(valid)
   valid ? res.status(200).json({message:'valid token'}) : res.status(403).send({message: 'unvalid token'});
  }
  else {
    res.status(403).json({message: 'not a member'});
  }
}
const logout = async(req, res) => {
  res.clearCookie('token').json({message: 'Logged out'})
}

const error404 = async (req, res) => {
  res.status(404).sendFile(join(__dirname, '../../../view/error404.html'));
}
const addNewUser = async(req, res) => {

 
const valid = await schema.validateAsync(req.body)
 
const {name, email, password} = req.body;
if(name && email && password) {
  const hashedPass = await bcrypt.hash(password, 10);
  const addquery = await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',[name, email, hashedPass]);
  const getUser = await connection.query('SELECT * FROM users WHERE email = $1',[email]);
  const user = await getUser.rows[0];
  const token = await signToken({name, email, id: user.id});
  res.status(200).cookie('token', token).redirect('/');
}
 

  
}
module.exports = {home, addNewUser, signUp,checkUser, login, logout, profile, error404};

