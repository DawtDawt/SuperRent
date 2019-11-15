const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWRD,
    port: process.env.DB_PORT,
});

function getCustomers(request, response) {
    pool.query("SELECT * FROM customer", (error, result) => {
        if (error) {
            throw error
        }
        response.json(result.rows);
    });
}

module.exports = {
    getCustomers
};
