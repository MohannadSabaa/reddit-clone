
const connection = require('../../../model/database');


const getUsers = async (req, res) => {
    const getData = await connection.query('SELECT * FROM users');
    const users = await getData.rows;
    res.status(201).json(users);
}


module.exports = { getUsers};