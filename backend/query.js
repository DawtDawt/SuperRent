const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWRD,
    port: process.env.DB_PORT,
});



// abstracted queries
const vehiclesQuery = `SELECT * FROM vehicle WHERE vtname LIKE $1 AND location LIKE $2 AND NOT EXISTS
    (SELECT * FROM rent r WHERE (r.fromDate < $3 AND $3 < r.toDate) OR (r.fromDate < $4 AND $4 < r.toDate) OR
    (r.fromDate = $4 AND r.fromTime < $6) OR (r.toDate = $3 AND $5 < r.toTime))`;


function getVehicle(request, response) {
    // assume fromDate, toDate, fromTime, toTime are all empty or all valid strings
    let vtname = request.body.vtname;
    let location = request.body.location;
    let fromDate = request.body.fromDate;
    let toDate = request.body.toDate;
    let fromTime = request.body.fromTime;
    let toTime = request.body.toTime;
    if (typeof vtname === "object") {
        vtname = '%';
    }
    if (typeof location === "object") {
        location = '%';
    }
    if (typeof fromDate === "object") {
        fromDate = '9999-01-01';
        toDate = '9999-02-01';
        fromTime = '10:00:00';
        toTime = '12:00:00';
    }
    // query: SELECT vehicles fulfilling type, location, and NOT in Rent during time interval
    return pool.query(vehiclesQuery, [vtname, location, fromDate, toDate, fromTime, toTime])
        .then(result => {
            return response.json({
                data: result.rows
            });
        })
        .catch(error => {
            return response.status(404).send({
                error: error,
                message: "Problem Getting Vehicles"
            });
        });
}

function getReserve(request, response) {
    const confNo = request.query.confNo;
    return pool.query(`SELECT * FROM reservation WHERE confNo = $1`, [confNo])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject("No such reservation found");
            }
            return response.json({
                data: result.rows[0]
            });
        })
        .catch(error => {
            return response.signal(404).send({
                error: error,
                message: "Problem Getting Reservation"
            });
        })
}

function createReserve(request, response) {
    // assume all params are valid strings
    const vtname = request.body.vtname;
    const location = request.body.location;
    const fromDate = request.body.fromDate;
    const toDate = request.body.toDate;
    const fromTime = request.body.fromTime;
    const toTime = request.body.toTime;
    // query: check if such vehicle is available
    return pool.query(vehiclesQuery, [vtname, location, fromDate, toDate, fromTime, toTime])
        .then(result => {
            // throws error if no reservation slot is available
            if (result.rows.length === 0) {
                return Promise.reject("No such vehicle available");
            }
            // perform actual reservation, returning confNo
            return pool.query(`INSERT INTO reservation(vtname, dlicense, fromdate, todate, fromtime, totime)
                        VALUES ($1, $2, $3, $4, $5, %6) RETURNING confNo`,
                [vtname, location, fromDate, toDate, fromTime, toTime]);
        })
        .then(result => {
            // data = confNo
            return response.json({
                data: result
            });
        })
        .catch(error => {
            return response.status(404).send({
                error: error,
                message: "Problem Creating Reservation"
            });
        })
}

function getCustomer(request, response) {
    const dlicense = request.query.dlicense;
    return pool.query(`SELECT * FROM customer WHERE dlicense = $1`, [dlicense])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject("Customer Not Found");
            }
            return response.json({
                // data = tuple
                data: result.rows[0]
            });
        })
        .catch(error => {
            return response.signal(404).send({
                error: error,
                message: "Problem Getting Customer Information"
            });
        })
}

function createCustomer(request, response) {
    const dlicense = request.body.dlicense;
    const cellphone = request.body.cellphone;
    const name = request.body.name;
    const address = request.body.address;
    // check if current customer already exists
    return pool.query(`INSERT INTO customer VALUES($1, $2, $3, $4) RETURNING dlicense`,
        [dlicense, cellphone, name, address])
        .then(result => {
            // data = dlicense
            return response.json({
                data: result
            });
        })
        .catch(error => {
            return response.status(404).send({
                error: error,
                message: "Problem Creating Customer"
            });
        })
}

function getRent(request, response) {
    const rid = request.query.rid;
    return pool.query(`SELECT * FROM rent WHERE rid = $1`, [rid])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject("Rent Not Found");
            }
            return response.json({
                // data = tuple
                data: result.rows[0]
            });
        })
        .catch(error => {
            return response.signal(404).send({
                error: error,
                message: "Problem Getting Rent Record"
            });
        })
}

function createRent(request, response) {
    const vlicense = request.body.vlicense;
    const dlicense = request.body.dlicense;
    const fromDate = request.body.fromDate;
    const toDate = request.body.toDate;
    const fromTime = request.body.fromTime;
    const toTime = request.body.toTime;
    const odometer = request.body.odometer;
    const cardName = request.body.cardName;
    const expDate = request.body.expDate;
    const confNo = request.body.confNo;
    return pool.query(`INSERT INTO rental(vlicense, dlicense, fromdate, todate, fromtime, totime, odometer, cardname, cardno, expdate, confno)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING rid`,
        [vlicense, dlicense, fromDate, toDate, fromTime, toTime, odometer, cardName, expDate, confNo])
        .then(result => {
            return response.json({
                // data = rid
                data: result
            });
        })
        .catch(error => {
            return response.signal(404).send({
                error: error,
                message: "Problem Creating New Rental Record"
            });
        })
}

function returnVehicle(request, response) {
    const rid = request.body.rid;
    const date = request.body.date;
    const time = request.body.time;
    const odometer = request.body.odometer;
    const fulltank = request.body.fulltank;
    const value = request.body.value;
    return pool.query(`INSERT INTO return
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING rid`,
        [rid, date, time, odometer, fulltank, value])
        .then(result => {
            // data = rid
            return response.json({
                data: result
            });
        })
        .catch(error => {
            return response.status(404).send({
                error: error,
                message: "Problem Creating Return Record"
            });
        })
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
    getReserve,
    createReserve,
    getCustomer,
    createCustomer,
    getRent,
    createRent,
    returnVehicle,
    getReport,
    getTable,
    addData,
    removeData,
    updateData
};
