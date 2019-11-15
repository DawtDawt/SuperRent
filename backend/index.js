const express = require('express');
const app = express();
const port = 8080;
const query = require("./query");

express.urlencoded({
    extended: true,
});


// Endpoints

// View the number of available vehicles
app.get('/vehicle', query.getVehicle);

// Make a reservation
app.post('/reserve', query.reserve);

// Create a new customer profile
app.post('/customer/create', query.createCustomer);

// Rent a vehicle
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

