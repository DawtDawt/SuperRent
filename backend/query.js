const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWRD,
    port: process.env.DB_PORT,
});

function getVehicle(request, response) {
    // View available vehicles based on any subset of {specific car type, location, time interval
    const vtname = request.params.vtname;
    const location = request.params.location;
    const fromTime = request.params.fromTime;
    const toTime = request.params.toTime;
    const fromDate = request.params.fromDate;
    const toDate = request.params.toDate;
    // query: SELECT vehicles fulfilling type, location, and NOT in Rent during time interval
    pool.query(`SELECT * FROM vehicle 
                WHERE vtname = ${vtname} AND location = ${location} AND NOT EXISTS
                    (SELECT * FROM rent r
                    WHERE (r.fromDate < ${fromDate} AND ${fromDate} < r.toDate) OR
                          (r.fromDate < ${toDate} AND ${toDate} < r.toDate) OR
                          (r.fromDate = ${toDate} AND r.fromTime < ${toTime}) OR
                          (r.toDate = ${fromDate} AND ${fromTime} < r.toTime)
                    )`,
        (error, result) => {
        if (error) {
            return response.status(404).send({
                error: error,
                message: "Table Not Found"
            });
        }
        // sends response containing the table rows back to client
        return response.json({
            data: result.rows
        });
    })
}

function reserve(request, response) {
    // TODO
}

function createCustomer(request, response) {
    // TODO
}

function rent(request, response) {
    // Rents a vehicle
    // TODO
}

function returnVehicle(request, response) {
    // TODO
}

function getTable(request, response) {
    // TODO
    // this is only an example of how to call SQL statements using node-postgres
    const tableKind = request.params.tableName; // Ex: vehicle
    pool.query(`SELECT * FROM ${tableKind}`, (error, result) => {
        if (error) {
            return response.status(404).send({
                error: error,
                message: "Table Not Found"
            });
        }
        // sends response containing the table rows back to client
        return response.json({
            data: result.rows
        });
    });
}

function getReport(request, response) {
    // TODO
}

function addData(request, response) {
    // TODO
}

function removeData(request, response) {
    // TODO
}

function updateData(request, response) {
    // TODO
}

module.exports = {
    getVehicle,
    reserve,
    createCustomer,
    rent,
    returnVehicle,
    getReport,
    getTable,
    addData,
    removeData,
    updateData
};