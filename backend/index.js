const express = require('express');
const app = express();
const port = 8080;
const query = require("./query");

// init body-parser for post
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));


// Endpoints

// @ all returns are returned in json.stringy()

// View the number of available vehicles
// requires: vtname, location, fromDate, toDate, fromTime, toTime
// @return result.rows
app.post('/vehicle/get', query.getVehicle);

// Get reservation information based off confNo
// requires: confNo
// @return result.rows[0] if found, error if not found
app.get('/reserve/get', query.getReserve);

// Make a reservation
// requires: vtname, location, fromDate, toDate, fromTime, toTime
// @return confNo
app.post('/reserve/create', query.createReserve);

// View the information about the customer
// requires: dlicense
// @return result.row[0] if found, error if not found
app.get('/customer/get', query.getCustomer);

// Create a new customer profile
// requires: dlicense, cellphone, name, address
// @return dlicense
app.post('/customer/create', query.createCustomer);

// Get a rent based of rid
// requires: rid
// @return result.rows[0] if found, error if not found
app.get('/rent/get', query.getRent);

// Rent a vehicle
// requires: vlicense, dlicense, fromDate, toDate, fromTime, toTime, odometer, cardName, expDate, confNo
// @return rid
app.post('/rent/create', query.createRent);

// Return a vehicle
// rid, date, time, odometer, fulltank, value
// @return rid
app.post('/return', query.returnVehicle);

// Rental/Return Report
app.get('/report/', query.getReport);

// View table named :tableName
app.get('/table/:tableName', query.getTable);

// Insert tuple
app.post('/add', query.addData);

// Delete tuple
app.post('/remove', query.removeData);

// Update tuple
app.post('/update', query.updateData);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

