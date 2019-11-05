const Pool = require('pg').Pool;
const pool = new Pool({
    user: "me",
    host: "localhost",
    database: "cpsc304",
    password: "password",
    port: 5432,
});

pool.query();