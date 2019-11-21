CREATE TABLE VehicleType (
    vtname VARCHAR(50) PRIMARY KEY,
    features TEXT,
    wrate INTEGER,
    drate INTEGER,
    hrate INTEGER,
    wirate INTEGER,
    dirate INTEGER,
    hirate INTEGER,
    krate INTEGER
);

CREATE TABLE Customer (
    dlicense VARCHAR(50) PRIMARY KEY,
    cellphone BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL
);

CREATE TABLE Reservation (
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
    FOREIGN KEY (dlicense) REFERENCES Customer(dlicense)
);

CREATE TABLE Vehicle (
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
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname)
);

CREATE TABLE Rental(
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
    FOREIGN KEY (confno) REFERENCES Reservation(confno)
);

CREATE TABLE Return (
    rid BIGINT PRIMARY KEY REFERENCES Rental (rid),
    date DATE NOT NULL,
    time TIME NOT NULL,
    odometer INT NOT NULL,
    fulltank BOOLEAN NOT NULL,
    value BIGINT NOT NULL
);