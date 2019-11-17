const express = require('express');
const app = express();
const port = 8080;
const query = require("./query");

// init body-parser for post
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.get('/', (request, response) => {
    response.status(200).send('ok');
});

// Endpoints

// @ all returns are returned in json.stringy()

// View the number of available vehicles
// requires: vtname, location, city, fromdate, todate, fromtime, totime
// @return data: tuples
app.get('/vehicle/get', query.getVehicle);

// Get reservation information based off confno
// requires: confno
// @return data: singular tuple if found, error if not found
app.get('/reserve/get', query.getReserve);

// Make a reservation
// requires: vtname, dlicense, location, city, fromdate, todate, fromtime, totime
// @return data: confno
app.post('/reserve/create', query.createReserve);

// View the information about the customer
// requires: dlicense
// @return data: tuple if found, error if not found
app.get('/customer/get', query.getCustomer);

// Create a new customer profile
// requires: dlicense, cellphone, name, address
// @return data: dlicense
app.post('/customer/create', query.createCustomer);

// Get a rent based of rid
// requires: rid
// @return data: tuple if found, error if not found
app.get('/rent/get', query.getRent);

// Rent a vehicle
// requires: vlicense, dlicense, fromdate, todate, fromtime, totime, odometer, cardname, expdate, confno
// @return data: rid
app.post('/rent/create', query.createRent);

// Return a vehicle
// rid, date, time, odometer, fulltank, value
// @return data: rid
app.post('/return/create', query.createReturn);

// Daily Rental Report
// requires: date
// @return data: {vehicle, perCategory, perBranch, perCompany}, where vehicle, perCategory, perBranch: tuples
app.get('/report/rental', query.getDailyRental);

// Daily Rental Report By Branch
// requires: date, location, city
// @return result.rows
app.get('/report/rental/branch', query.getDailyBranchRental);

// Daily Return Report
// requires: date
// @return data: {vehicle, perCategory, revenuePerCategory, perBranch, revenuePerBranch, revenueTotal},
// where vehicle, perCategory, revenuePerCategory, perBranch, revenuePerBranch: tuples
app.get('/report/return', query.getDailyReturn);

// Daily Return Report
// requires: date, location, city
// @return data: {vehicle, perCategory, revenuePerCategory, perBranch, revenuePerBranch, revenueTotal},
// where vehicle, perCategory, revenuePerCategory, perBranch, revenuePerBranch: tuples
app.get('/report/return/branch', query.getDailyBranchReturn);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

