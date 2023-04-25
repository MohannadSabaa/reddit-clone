const {Pool} = require('pg');
const {DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env;

const DB_URL = `postgresql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const connection = new Pool({connectionString:DB_URL});


module.exports = connection;