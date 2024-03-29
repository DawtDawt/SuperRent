const {Pool} = require('pg');
require('dotenv').config();
const moment = require('moment');

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
    let fromtime = '00:00:00';
    let totime = '23:59:59';
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
    return pool.query(`SELECT * from vehicletype WHERE vtname LIKE $1`, [vtname]).then(result => {
        if (result.rows.length === 0) {
            return Promise.reject({message: "Given vehicle type does not exist."});
        }
        return pool.query(`SELECT * from vehicle WHERE location LIKE $1 AND city LIKE $2`, [location, city]);
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
                return Promise.reject({message: "All such vehicles are either reserved or rented."});
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
    console.log("confno: " + confno);
    return pool.query(`SELECT * FROM reservation WHERE confno = $1`, [confno])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({message: "No such reservation found for the given confirmation number."});
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
            return pool.query(`SELECT * from customer WHERE dlicense = $1`, [dlicense]);
        })
        .then(result => {
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
            return pool.query(`SELECT confno FROM reservation WHERE dlicense = $1 AND confno IN
            (SELECT confno FROM rental WHERE rid NOT IN (SELECT rid FROM return))`, [dlicense]);
        }).then(confnoResult => {
            if (confnoResult.rows.length > 0) {
                return Promise.reject({message: "Only one reservation can be made per customer. You have either made a reservation with" +
                        " the confirmation number: " + confnoResult.rows[0].confno + ". Or you're are currently renting using the given reservation number."});
            }
            // perform actual reservation, returning confno
            return pool.query(`INSERT INTO reservation(vtname, dlicense, location, city, fromdate, todate, fromtime, totime)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
                [vtname, dlicense, location, city, fromdate, todate, fromtime, totime]);
        })
        .then(result => {
            // data = confno
            return response.json({
                data: result.rows[0]
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
                return Promise.reject({message: "No customer found in database with given driver's license."});
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
    return pool.query(`SELECT * FROM customer WHERE dlicense = $1`, [dlicense])
        .then(result => {
            if (result.rows.length > 0) {
                return Promise.reject({message: "Customer is already an existing member."});
            }
            return pool.query(`INSERT INTO customer VALUES($1, $2, $3, $4) RETURNING *`,
                [dlicense, cellphone, name, address]);
        })
        .then(result => {
            // data = dlicense
            return response.json({
                data: result.rows[0]
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
                return Promise.reject({message: "Rental not found with given rental id."});
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
    let odometer;
    const cardname = request.body.cardname;
    const cardno = Number(request.body.cardno);
    const expdate = request.body.expdate;
    const confno = Number(request.body.confno);
    let finalResult;
    console.log(expdate);
    console.log(confno);
    return pool.query(`SELECT * FROM vehicle WHERE vlicense = $1`, [vlicense])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({message: "No vehicle found in database with given vehicle license."});
            }
            return pool.query(`SELECT * FROM customer WHERE dlicense = $1`, [dlicense]);
        })
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({message: "No customer found in database with given driver's license."});
            }
            return pool.query(`SELECT * FROM reservation WHERE confno = $1`, [confno]);
        })
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({message: "No reservation found in database with given confirmation number."});
            }
            return pool.query(`SELECT rid FROM rental WHERE dlicense = $1 AND rid NOT IN
            (SELECT rid FROM return)`, [dlicense]);
        })
        .then(result => {
            if (result.rows.length > 0) {
                return Promise.reject({message: "Customer is already renting a vehicle with an existing rental record: " + result.rows[0].rid + "."});
            }
            return pool.query(`SELECT odometer FROM vehicle WHERE vlicense = $1`, [vlicense]);
        })
        .then(result => {
            odometer = Number(result.rows[0].odometer);
            return pool.query(`INSERT INTO rental(vlicense, dlicense, fromdate, todate, fromtime, totime, odometer, cardname, cardno, expdate, confno)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
                [vlicense, dlicense, fromdate, todate, fromtime, totime, odometer, cardname, cardno, expdate, confno]);
        })
        .then(result => {
            finalResult = result;
            return pool.query(`UPDATE vehicle SET status = $1 WHERE vlicense = $2`, ['rented', vlicense]);
        })
        .then(() => {
            return response.json({
                // data = rid
                data: finalResult.rows[0]
            });
        })
        .catch(error => {
            return response.send({
                error: error,
                message: "Problem Creating New Rental Record"
            });
        });

}

function getReturn(request, response) {
    const rid = Number(request.query.rid);
    return pool.query(`SELECT * FROM return WHERE rid = $1`, [rid])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({message: "Return not found with given rental id."});
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

function createReturn(request, response) {
    function parseIcsDate(icsDate) {
        if (!/^[0-9]{8}T[0-9]{6}Z$/.test(icsDate))
            throw new Error("ICS Date is wrongly formatted: " + icsDate);

        var year   = icsDate.substr(0, 4);
        var month  = icsDate.substr(4, 2);
        var day    = icsDate.substr(6, 2);

        var hour   = icsDate.substr(9, 2);
        var minute = icsDate.substr(11, 2);
        var second = icsDate.substr(13, 2);

        return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    }
    const rid = request.body.rid;
    const date = request.body.date;
    const time = request.body.time;
    const odometer = request.body.odometer;
    const fulltank = Boolean(request.body.fulltank);
    let value = 0;
    let finalResult;
    return pool.query(`SELECT * FROM rental WHERE rid = $1`, [rid])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({message: "No rental record found in database with given rental id."});
            }
            return pool.query(`SELECT * FROM return WHERE rid = $1`, [rid]);
        })
        .then(result => {
            if (result.rows.length > 0) {
                return Promise.reject({message: "This rental record has already been returned."});
            }
            return pool.query(`SELECT * FROM rental r, vehicle v, vehicletype vt WHERE r.rid = $1
            AND v.vlicense = r.vlicense AND v.vtname = vt.vtname`, [rid]);
        })
        .then(result => {
            const initialOdometer = Number(result.rows[0].odometer);
            const krate = result.rows[0].krate;
            const kvalue = krate * (odometer - initialOdometer);
            const fromdate = new Date(result.rows[0].fromdate);
            const fromtime = new Date(result.rows[0].fromtime);
            const mFromDate = moment(fromdate).format("YYYY-MM-DD");
            const mFromTime = moment(fromtime).format("hh:mm a");
            const from = moment(mFromDate + mFromTime, "YYYY-MM-DD hh:mm a").toDate();
            console.log(from);
            console.log(date);
            console.log(time);
            const to = moment(date + " " + time, "YYYY-MM-DD hh:mm a").toDate();
            let msec = to - from;
            const ww = Math.floor(msec / 1000 / 60 / 60 / 24 / 7);
            msec -= ww * 1000 * 60 * 60 * 24 * 7;
            const dd = Math.floor(msec / 1000 / 60 / 60 / 24);
            msec -= dd * 1000 * 60 * 60 * 24;
            const hh = Math.floor(msec / 1000 / 60 / 60);
            const wrate = result.rows[0].wrate;
            const drate = result.rows[0].drate;
            const hrate = result.rows[0].hrate;
            const tvalue = wrate * ww + drate * dd + hrate * hh;
            value = kvalue + tvalue;
            if (!fulltank) {
                value += 50;
            }
            console.log(value);
            return pool.query(`INSERT INTO return(rid, date, time, odometer, fulltank, value)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [rid, date, time, odometer, fulltank, value]);
        })
        .then(result => {
            finalResult = result;
            return pool.query(`UPDATE vehicle SET status = $1, odometer = $2 WHERE vlicense = (SELECT vlicense FROM rental WHERE rid = $3)`,
                ['available', odometer, rid]);
        })
        .then(() => {
            // data = rid
            return response.json({
                data: finalResult.rows[0]
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
    return pool.query(`SELECT * from vehicle WHERE location = $1 AND city = $2`, [location, city])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({message: "Given branch does not exist."});
            }
            return pool.query(`SELECT * FROM vehicle v, rental r
                    WHERE v.vlicense = r.vlicense AND r.fromdate = $1 AND v.location = $2 AND v.city = $3
                    ORDER BY v.city, v.location, v.vtname`, [date, location, city]);
        })
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
    return pool.query(`SELECT * from vehicle WHERE location = $1 AND city = $2`, [location, city])
        .then(result => {
            if (result.rows.length === 0) {
                return Promise.reject({message: "Given branch does not exist."});
            }
            return pool.query(`SELECT *
                            FROM vehicle v, rental r1, return r2
                            WHERE v.vlicense = r1.vlicense AND r1.rid = r2.rid AND r2.date = $1 AND v.location = $2 AND v.city = $3
                            ORDER BY v.city, v.location, v.vtname`, [date, location, city]);
        })
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
    getReturn,
    createReturn,
    getDailyRental,
    getDailyBranchRental,
    getDailyReturn,
    getDailyBranchReturn,
    getTable
};
