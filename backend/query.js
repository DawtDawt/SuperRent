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
const vehicleRentQuery = `SELECT * FROM vehicle WHERE vtname LIKE $1 AND location LIKE $2 AND city LIKE $3 AND vlicense NOT IN
    (SELECT r.vlicense FROM rental r WHERE (r.fromdate < $4 AND $4 < r.todate) OR (r.fromdate < $5 AND $5 < r.todate) OR
                                  ($4 <= r.fromdate AND r.todate <= $5 AND r.fromdate <> r.todate) OR
                                  (r.todate = $4 AND $6 < r.totime AND r.todate <> r.fromdate) OR
                                  (r.fromdate = $5 AND r.fromtime < $7 AND r.todate <> r.fromdate) OR
                                  (r.fromdate = $4 AND r.todate = $5 AND r.fromdate = r.todate AND r.fromtime <= $6 AND $6 <= r.totime) OR
                                  (r.fromdate = $4 AND r.todate = $5 AND r.fromdate = r.todate AND r.fromtime <= $7 AND $7 <= r.totime))`;
const vehicleReservationQuery = `SELECT * FROM reservation r WHERE r.vtname LIKE $1 AND location LIKE $2 AND city LIKE $3 AND
                                 ((r.fromdate < $4 AND $4 < r.todate) OR (r.fromdate < $5 AND $5 < r.todate) OR
                                  ($4 <= r.fromdate AND r.todate <= $5 AND r.fromdate <> r.todate) OR
                                  (r.todate = $4 AND $6 < r.totime AND r.todate <> r.fromdate) OR
                                  (r.fromdate = $5 AND r.fromtime < $7 AND r.todate <> r.fromdate) OR
                                  (r.fromdate = $4 AND r.todate = $5 AND r.fromdate = r.todate AND r.fromtime <= $6 AND $6 <= r.totime) OR
                                  (r.fromdate = $4 AND r.todate = $5 AND r.fromdate = r.todate AND r.fromtime <= $7 AND $7 <= r.totime))`;


function getVehicle(request, response) {
    // assume fromdate, todate, fromtime, totime are all empty or all valid strings
    let vtname = '%';
    let location = '%';
    let city = '%';
    let fromdate = '9999-01-01';
    let todate = '9999-02-01';
    let fromtime = '10:00:00';
    let totime = '12:00:00';
    if (request.query.hasOwnProperty("vtname")) {
        vtname = request.query.vtname;
    }
    if (request.query.hasOwnProperty("location")) {
        location = request.query.location;
    }
    if (request.query.hasOwnProperty("city")) {
        city = request.query.city;
    }
    if (request.query.hasOwnProperty("fromdate")) {
        fromdate = request.query.fromdate;
    }
    if (request.query.hasOwnProperty("todate")) {
        todate = request.query.todate;
    }
    if (request.query.hasOwnProperty("fromtime")) {
        fromtime = request.query.fromtime;
    }
    if (request.query.hasOwnProperty("totime")) {
        totime = request.query.totime;
    }
    let finalResult;
    // query: SELECT vehicle fulfilling type, location, and NOT in Rent during time interval
    return pool.query(`SELECT * from vehicletype WHERE vtname = $1`, [vtname]).then(result => {
        if (result.rows.length === 0) {
            return Promise.reject({message: "Given vehicle type does not exist."});
        }
        return pool.query(`SELECT * from vehicle WHERE location = $1 AND city = $2`, [location, city]);
    })
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({message: "Given branch does not exist."});
            }
            return pool.query(vehicleRentQuery, [vtname, location, city, fromdate, todate, fromtime, totime]);
        })
        .then(result => {
            // throws error if no reservation slot is available
            if (result.rows.length === 0) {
                return Promise.reject({message: "No such vehicle available for rent."});
            }
            finalResult = result;
            return pool.query(vehicleReservationQuery, [vtname, location, city, fromdate, todate, fromtime, totime]);
        })
        .then(reserveResult => {
            if (finalResult.rows.length <= reserveResult.rows.length) {
                return Promise.reject({ message: "All such vehicles are either reserved or rented."});
            }
            return Promise.resolve();
        })
        .then(() => {
            return response.json({
                data: finalResult.rows
            });
        })
        .catch(error => {
            return response.send({
                error: error,
                message: "Problem Getting vehicle"
            });
        });
}

function getReserve(request, response) {
    const confno = Number(request.query.confno);
    return pool.query(`SELECT * FROM reservation WHERE confno = $1`, [confno])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({code: 'RESMIA', message: "No such reservation found"});
            }
            return response.json({
                data: result.rows[0]
            });
        })
        .catch(error => {
            return response.send({
                error: error,
                message: "Problem Getting Reservation"
            });
        });
}

function createReserve(request, response) {
    // assume all params are valid strings
    const vtname = request.body.vtname;
    const dlicense = request.body.dlicense;
    const location = request.body.location;
    const city = request.body.city;
    const fromdate = request.body.fromdate;
    const todate = request.body.todate;
    const fromtime = request.body.fromtime;
    const totime = request.body.totime;
    // query: check if such vehicle is available
    let rentResult;
    return pool.query('SELECT * from customer WHERE dlicense = $1', [dlicense]).then(result => {
        if (result.rows.length === 0) {
            return Promise.reject({message: "No customer found in database with given driver's license."});
        }
        return pool.query(vehicleRentQuery, [vtname, location, city, fromdate, todate, fromtime, totime]);
    })
        .then(result => {
            // throws error if no reservation slot is available
            if (result.rows.length === 0) {
                return Promise.reject({message: "No such vehicle available for rent."});
            }
            rentResult = result;
            return pool.query(vehicleReservationQuery, [vtname, location, city, fromdate, todate, fromtime, totime]);
        })
        .then(reserveResult => {
            if (rentResult.rows.length <= reserveResult.rows.length) {
                return Promise.reject({message: "All such vehicles are either reserved or rented."});
            }
            return pool.query(`SELECT dlicense FROM reservation WHERE dlicense = $1`, [dlicense]);
        }).then(dlicenseResult => {
            if (dlicenseResult.rows.length > 0) {
                return Promise.reject({message: "Only one reservation can be made per customer"});
            }
            // perform actual reservation, returning confno
            return pool.query(`INSERT INTO reservation(vtname, dlicense, location, city, fromdate, todate, fromtime, totime)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING confno;`,
                [vtname, dlicense, location, city, fromdate, todate, fromtime, totime]);
        })
        .then(result => {
            // data = confno
            return response.json({
                data: result.rows[0].confno
            });
        })
        .catch(error => {
            return response.send({
                error: error,
                message: "Problem Creating Reservation"
            });
        });
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
            return response.send({
                error: error,
                message: "Problem Getting Customer Information"
            });
        });
}

function createCustomer(request, response) {
    const dlicense = request.body.dlicense;
    const cellphone = Number(request.body.cellphone);
    const name = request.body.name;
    const address = request.body.address;
    // check if current customer already exists
    return pool.query(`INSERT INTO customer VALUES($1, $2, $3, $4) RETURNING dlicense`,
        [dlicense, cellphone, name, address])
        .then(result => {
            // data = dlicense
            return response.json({
                data: result.rows[0].dlicense
            });
        })
        .catch(error => {
            return response.send({
                error: error,
                message: "Problem Creating Customer"
            });
        });
}

function getRent(request, response) {
    const rid = Number(request.query.rid);
    return pool.query(`SELECT * FROM rental WHERE rid = $1`, [rid])
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
            return response.send({
                error: error,
                message: "Problem Getting Rent Record"
            });
        });
}

function createRent(request, response) {
    const vlicense = request.body.vlicense;
    const dlicense = request.body.dlicense;
    const fromdate = request.body.fromdate;
    const todate = request.body.todate;
    const fromtime = request.body.fromtime;
    const totime = request.body.totime;
    const odometer = request.body.odometer;
    const cardname = request.body.cardname;
    const cardno = Number(request.body.cardno);
    const expdate = request.body.expdate;
    const confno = Number(request.body.confno);
    let finalResult;
    return pool.query(`INSERT INTO rental(vlicense, dlicense, fromdate, todate, fromtime, totime, odometer, cardname, cardno, expdate, confno)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING rid`,
        [vlicense, dlicense, fromdate, todate, fromtime, totime, odometer, cardname, cardno, expdate, confno])
        .then(result => {
            finalResult = result;
            return pool.query(`UPDATE vehicle SET status = $1 WHERE vlicense = $2`, ['rented', vlicense]);
        })
        .then(() => {
            return response.json({
                // data = rid
                data: finalResult.rows[0].rid
            });
        })
        .catch(error => {
            return response.send({
                error: error,
                message: "Problem Creating New Rental Record"
            });
        });
}

function createReturn(request, response) {
    const rid = request.body.rid;
    const date = request.body.date;
    const time = request.body.time;
    const odometer = Number(request.body.odometer);
    const fulltank = Boolean(request.body.fulltank);
    let value;
    let finalResult;
    return pool.query(`SELECT `)
    return pool.query(`INSERT INTO return(rid, date, time, odometer, fulltank, value)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING rid`,
        [rid, date, time, odometer, fulltank, value])
        .then(result => {
            finalResult = result;
            return pool.query(`UPDATE vehicle SET status = $1, odometer = $2 WHERE vlicense = (SELECT vlicense FROM rental WHERE rid = $3)`,
                ['available', odometer, rid]);
        })
        .then(() => {
            // data = rid
            return response.json({
                data: finalResult.rows[0].rid
            });
        })
        .catch(error => {
            return response.status(404).send({
                error: error,
                message: "Problem Creating Return Record"
            });
        });
}

function getDailyRental(request, response) {
    const date = request.query.date;
    let vehicleResult;
    let categoryResult;
    return pool.query(`SELECT * FROM vehicle v, rental r
                    WHERE v.vlicense = r.vlicense AND r.fromdate = $1
                    ORDER BY v.city, v.location, v.vtname`, [date])
        .then(result => {
            vehicleResult = result;
            return pool.query(`SELECT v.vtname, COUNT(*) AS count FROM vehicle v, rental r
                    WHERE v.vlicense = r.vlicense AND r.fromdate = $1
                    GROUP BY v.vtname`, [date]);
        })
        .then(result => {
            categoryResult = result;
            return pool.query(`SELECT v.location, v.city, COUNT(*) AS count FROM vehicle v, rental r
                    WHERE v.vlicense = r.vlicense AND r.fromdate = $1
                    GROUP BY v.city, v.location`, [date]);
        })
        .then(branchResult => {
            return response.json({
                data: {
                    vehicle: vehicleResult.rows,
                    perCategory: categoryResult.rows,
                    perBranch: branchResult.rows,
                    perCompany: vehicleResult.rows.length
                }
            });
        })
        .catch(error => {
            return response.send({
                error: error,
                message: "Problem Getting Daily Rental"
            });
        });
}

function getDailyBranchRental(request, response) {
    const date = request.query.date;
    const location = request.query.location;
    const city = request.query.city;
    let vehicleResult;
    let categoryResult;
    return pool.query(`SELECT * FROM vehicle v, rental r
                    WHERE v.vlicense = r.vlicense AND r.fromdate = $1 AND v.location = $2 AND v.city = $3
                    ORDER BY v.city, v.location, v.vtname`, [date, location, city])
        .then(result => {
            vehicleResult = result;
            return pool.query(`SELECT v.vtname, COUNT(*) AS count FROM vehicle v, rental r
                    WHERE v.vlicense = r.vlicense AND r.fromdate = $1 AND v.location = $2 AND v.city = $3
                    GROUP BY v.vtname`, [date, location, city]);
        })
        .then(result => {
            categoryResult = result;
            return pool.query(`SELECT v.location, v.city, COUNT(*) AS count FROM vehicle v, rental r
                    WHERE v.vlicense = r.vlicense AND r.fromdate = $1 AND v.location = $2 AND v.city = $3
                    GROUP BY v.city, v.location`, [date, location, city]);
        })
        .then(branchResult => {
            return response.json({
                data: {
                    vehicle: vehicleResult.rows,
                    perCategory: categoryResult.rows,
                    perBranch: branchResult.rows,
                    perCompany: vehicleResult.rows.length
                }
            });
        })
        .catch(error => {
            return response.send({
                error: error,
                message: "Problem Getting Daily Rental By Branch"
            });
        });
}

function getDailyReturn(request, response) {
    const date = request.query.date;
    let vehicleResult;
    let categoryResult;
    let revenuePerCategory;
    let branchResult;
    return pool.query(`SELECT *
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1
                            ORDER BY v.city, v.location, v.vtname`, [date])
        .then(result => {
            vehicleResult = result;
            return pool.query(`SELECT v.vtname, COUNT(*)
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1
                            GROUP BY v.vtname`, [date]);
        })
        .then(result => {
            categoryResult = result;
            return pool.query(`SELECT v.vtname, SUM(r2.value)
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1
                            GROUP BY v.vtname`, [date]);
        })
        .then(result => {
            revenuePerCategory = result;
            return pool.query(`SELECT v.location, v.city , COUNT(*)
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1
                            GROUP BY v.city, v.location`, [date]);
        })
        .then(result => {
            branchResult = result;
            return pool.query(`SELECT v.location, v.city , SUM(r2.value)
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1
                            GROUP BY v.city, v.location`, [date]);
        })
        .then(revenuePerBranch => {
            return response.json({
                data: {
                    vehicle: vehicleResult.rows,
                    perCategory: categoryResult.rows,
                    revenuePerCategory: revenuePerCategory.rows,
                    perBranch: branchResult.rows,
                    revenuePerBranch: revenuePerBranch.rows,
                    perCompany: vehicleResult.rows.length
                }
            });
        })
        .catch(error => {
            return response.send({
                error: error,
                message: "Problem Getting Daily Return"
            });
        });
}

function getDailyBranchReturn(request, response) {
    const date = request.query.date;
    const location = request.query.location;
    const city = request.query.city;
    let vehicleResult;
    let categoryResult;
    let revenuePerCategory;
    let branchResult;
    return pool.query(`SELECT *
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1 AND v.location = $2 AND v.city = $3
                            ORDER BY v.city, v.location, v.vtname`, [date, location, city])
        .then(result => {
            vehicleResult = result;
            return pool.query(`SELECT v.vtname, COUNT(*)
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1 AND v.location = $2 AND v.city = $3
                            GROUP BY v.vtname`, [date, location, city]);
        })
        .then(result => {
            categoryResult = result;
            return pool.query(`SELECT v.vtname, SUM(r2.value)
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1 AND v.location = $2 AND v.city = $3
                            GROUP BY v.vtname`, [date, location, city]);
        })
        .then(result => {
            revenuePerCategory = result;
            return pool.query(`SELECT v.location, v.city , COUNT(*)
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1 AND v.location = $2 AND v.city = $3
                            GROUP BY v.city, v.location`, [date, location, city]);
        })
        .then(result => {
            branchResult = result;
            return pool.query(`SELECT v.location, v.city , SUM(r2.value)
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1 AND v.location = $2 AND v.city = $3
                            GROUP BY v.city, v.location`, [date, location, city]);
        })
        .then(revenuePerBranch => {
            return response.json({
                data: {
                    vehicle: vehicleResult.rows,
                    perCategory: categoryResult.rows,
                    revenuePerCategory: revenuePerCategory.rows,
                    perBranch: branchResult.rows,
                    revenuePerBranch: revenuePerBranch.rows,
                    perCompany: vehicleResult.rows.length
                }
            });
        })
        .catch(error => {
            return response.send({
                error: error,
                message: "Problem Getting Daily Return By Branch"
            });
        });
}

function getTable (request, response) {
    const tableName = request.params.tableName;
    return pool.query(`SELECT * FROM ${tableName}`)
        .then(result => {
            const capitalizedTableName = tableName.charAt(0).toUpperCase() + tableName.slice(1);
            // if (result.rows.length === 0) {
            //     return Promise.reject(`${capitalizedTableName} Table Not Found`);
            // }
            return response.json({
                // data = tuple
                data: result.rows
            });
        })
        .catch(error => {
            return response.status(404).send({
                error: error,
                message: `Problem Getting ${tableName} Record`
            });
        });
}

module.exports = {
    getVehicle,
    getReserve,
    createReserve,
    getCustomer,
    createCustomer,
    getRent,
    createRent,
    createReturn,
    getDailyRental,
    getDailyBranchRental,
    getDailyReturn,
    getDailyBranchReturn,
    getTable
};
