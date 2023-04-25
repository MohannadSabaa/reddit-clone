const bcrypt = require('bcrypt');
const {signToken} = require('../../../utils/token');
const connection = require('../../../model/database');
const schema = require('../../../utils/joi');

const getUsers = async (req, res) => {
    const getData = await connection.query('SELECT * FROM users');
    const users = await getData.rows;
    res.status(201).json(users);
}
const addNewUser = async(req, res) => {

    const {name, email, password} = req.body;
  
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',[name, email, hashedPass]);
    const result = await user.rows;
    const token = await signToken({name, email});

res.status(200).cookie('token', token).redirect('/');
}

module.exports = {addNewUser, getUsers};