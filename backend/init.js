const {Pool} = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWRD,
    port: process.env.DB_PORT,
});

async function init() {
    await resetTables();
    await createTables();
    await populateTables();
}

async function resetTables() {
    try {
        await pool.query(`DROP SCHEMA public CASCADE`);
        await pool.query(`CREATE SCHEMA public`);
    } catch (error) {
        console.log(error);
    }
}

async function createTables() {
    try {
        await pool.query(`CREATE TABLE VehicleType (
    vtname VARCHAR(50) PRIMARY KEY,
    features TEXT,
    wrate INTEGER,
    drate INTEGER,
    hrate INTEGER,
    wirate INTEGER,
    dirate INTEGER,
    hirate INTEGER,
    krate INTEGER)`);
        await pool.query(`CREATE TABLE Customer (
    dlicense VARCHAR(50) PRIMARY KEY,
    cellphone BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL);`);
        await pool.query(`CREATE TABLE Reservation (
    confno BIGSERIAL PRIMARY KEY,
    vtname VARCHAR(50) NOT NULL,
    dlicense VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    fromdate DATE NOT NULL,
    todate DATE NOT NULL,
    fromtime TIME NOT NULL,
    totime TIME NOT NULL,
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname),
    FOREIGN KEY (dlicense) REFERENCES Customer(dlicense));`);
        await pool.query(`CREATE TABLE Vehicle (
    vlicense VARCHAR(6) PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    odometer INT NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status in ('rented', 'maintenance', 'available')),
    vtname VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname));`);
        await pool.query(`CREATE TABLE Rental(
    rid BIGSERIAL PRIMARY KEY,
    vlicense VARCHAR(6) NOT NULL,
    dlicense VARCHAR(50) NOT NULL,
    fromdate DATE NOT NULL,
    todate DATE NOT NULL,
    fromtime TIME NOT NULL,
    totime TIME NOT NULL,
    odometer INT NOT NULL,
    cardname VARCHAR(50) NOT NULL,
    cardno BIGINT NOT NULL,
    expdate DATE NOT NULL,
    confno BIGINT UNIQUE NOT NULL,
    FOREIGN KEY (vlicense) REFERENCES Vehicle(vlicense),
    FOREIGN KEY (dlicense) REFERENCES Customer(dlicense),
    FOREIGN KEY (confno) REFERENCES Reservation(confno));`);
        await pool.query(`CREATE TABLE Return (
    rid BIGINT PRIMARY KEY REFERENCES Rental (rid),
    date DATE NOT NULL,
    time TIME NOT NULL,
    odometer INT NOT NULL,
    fulltank BOOLEAN NOT NULL,
    value BIGINT NOT NULL);`);
    } catch (error) {
        console.log(error);
    }
}

async function populateTables() {
    await populateCustomer();
    await populateVehicleTypes();
    await populateVehicles();
}

async function populateVehicles() {
    const makes = ['Tesla', 'Toyota', 'BMW', 'Mazda', 'Ferrari', 'Jaguar', 'Hyundai', 'Lexus'];
    const colors = ['white', 'black', 'beige', 'blue', 'red', 'gold'];
    const locations = ['UBC', 'Kitsilano', 'Dunbar', 'Kerrisdale', 'Oakridge', 'Richmond Centre', 'Kingsway', 'Metrotown',
    'Queen\'s Park', 'Downtown'];
    const cities = ['Vancouver', 'Vancouver', 'Vancouver', 'Vancouver', 'Vancouver', 'Richmond', 'Burnaby', 'Burnaby', 'Surrey',
        'Vancouver'];
    let array = {};
    for (let i = 0; i < 500; i++) {
        const vlicense = randomCapString(3) + randomNum(3);
        const make = makes[getRandomInt(8)];
        const model = 'Model ' + randomNum(1);
        const year = Number(randomYear());
        const color = colors[getRandomInt(6)];
        const odometer = getRandomInt(20000);
        const status = 'available';
        const vtname = (await pool.query(`SELECT vtname FROM vehicletype ORDER BY random() LIMIT 1`)).rows[0].vtname;
        let randomNumber = getRandomInt(10);
        const location = locations[randomNumber];
        const city = cities[randomNumber];
        array[vlicense] = {a: vlicense, b: make, c: model, d: year,
        e: color, f: odometer, g: status, h: vtname, i: location,
        j: city};
    }
    for (let index in array) {
        if (array[index].hasOwnProperty('a')) {
            try {
                await pool.query(`INSERT INTO vehicle VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                    [array[index].a, array[index].b, array[index].c, array[index].d, array[index].e, array[index].f,
                        array[index].g, array[index].h, array[index].i, array[index].j]);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

async function populateVehicleTypes() {
    try {
        await pool.query(`INSERT INTO VehicleType VALUES
    ('Economy', 'ELECTRIC', 200, 40, 30, 20, 10, 5, 1);`);
        await pool.query(`INSERT INTO VehicleType VALUES
    ('Compact', 'ELECTRIC', 300, 40, 30, 20, 10, 5, 0.5);`);
        await pool.query(`INSERT INTO VehicleType VALUES
    ('Mid-size', 'ELECTRIC', 400, 50, 30, 20, 10, 10, 0.5);`);
        await pool.query(`INSERT INTO VehicleType VALUES
    ('Standard', 'ELECTRIC', 450, 50, 30, 30, 20, 10, 0.5);`);
        await pool.query(`INSERT INTO VehicleType VALUES
    ('Full-size', 'ELECTRIC', 500, 70, 30, 40, 20, 10, 0.5);`);
        await pool.query(`INSERT INTO VehicleType VALUES
    ('SUV', 'ELECTRIC', 600, 70, 30, 40, 20, 10, 0.5);`);
        await pool.query(`INSERT INTO VehicleType VALUES
    ('Truck', 'ELECTRIC', 700, 70, 30, 40, 20, 10, 0.5);`);
    } catch (error) {
        console.log(error);
    }
}

async function populateCustomer() {
    let array = [];
    for (let i = 0; i < 100; i++) {
        const dlicense = Math.floor(100000 + Math.random() * 900000);
        const cellphone = Math.floor(100000000 + Math.random() * 900000000);
        const name = randomCapString(1) + randomString(5) + ' ' + randomCapString(1) + randomString(7);
        const address = randomNum(4) + ' ' + randomCapString(1) + randomString(7) + ' Street';
        array[dlicense] = {a: dlicense, b: cellphone, c: name, d: address};
    }
    for (let index of array) {
        if (index !== undefined) {
            try {
                await pool.query(`INSERT INTO customer VALUES ($1, $2, $3, $4)`, [index.a, index.b, index.c, index.d]);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

function randomCapString(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomString(length) {
    let result           = '';
    const characters       = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomNum(length) {
    let result           = '';
    const characters       = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomYear() {
    return '20' + String(getRandomInt(3)) + randomNum(1);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

module.exports = {
    init
};