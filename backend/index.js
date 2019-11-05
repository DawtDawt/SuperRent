const express = require('express');
const app = express();
const port = 3000;

express.urlencoded({
    extended: true,
});

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

