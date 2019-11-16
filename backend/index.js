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
// @return result.rows
app.post('/vehicle', query.getVehicle);

// Make a reservation
// @return confNo
app.post('/reserve', query.reserve);

// View the information about the customer
// @return result.row[0] if found, empty object if not found
app.get('/customer', query.getCustomer);

// Create a new customer profile
app.post('/customer/create', query.createCustomer);

// Rent a vehicle
// @return rid
app.post('/rent', query.rent);

// Return a vehicle
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

