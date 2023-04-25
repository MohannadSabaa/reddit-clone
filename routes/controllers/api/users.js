const bcrypt = require('bcrypt');
const Joi = require('joi');
const {signToken} = require('../../../utils/token');
const connection = require('../../../model/database');
const schema = require('../../../utils/joi');

const getUsers = async (req, res) => {
    const getData = await connection.query('SELECT * FROM users');
    const users = await getData.rows;
    res.status(201).json(users);
}
const addNewUser = async(req, res) => {
try {
    const {name, email, password} = req.body;
    const validate = await schema.validateAsync(schema, req.body);
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',[name, email, hashedPass]);
    const result = await user.rows;
    const token = await signToken({name, email});
    res.status(200).cookie('token', token).redirect('/');
}

catch (error) {
res.status(404).json(error)
}

}

module.exports = {addNewUser, getUsers};