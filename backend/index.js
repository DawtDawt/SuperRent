const express = require('express');
const app = express();
const port = 3000;
const query =  require("./queries");


express.urlencoded({
    extended: true,
});

app.get('/customers', query.getCustomers);

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

