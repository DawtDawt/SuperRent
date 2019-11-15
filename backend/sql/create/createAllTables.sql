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
    cellphone BIGINT,
    name VARCHAR(255),
    address TEXT
);

CREATE TABLE Reservation (
    confNo BIGINT PRIMARY KEY,
    vtname VARCHAR(50),
    dlicense VARCHAR(50),
    fromDate DATE,
    toDate DATE,
    fromTime TIME,
    toTime TIME,
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname),
    FOREIGN KEY (dlicense) REFERENCES Customer(dlicense)
);

CREATE TABLE Rental(
    rid BIGINT PRIMARY KEY,
    vlicense BIGINT,
    dlicense VARCHAR(50),
    fromDate DATE,
    toDate DATE,
    fromTime TIME,
    toTime TIME,
    odometer INT,
    cardName VARCHAR(50),
    cardNo BIGINT,
    ExpDate DATE,
    confNo BIGINT,
    FOREIGN KEY (dlicense) REFERENCES Customer(dlicense),
    FOREIGN KEY (confNo) REFERENCES Reservation(confNo)
);

CREATE TABLE Vehicle (
    vlicense VARCHAR(6) PRIMARY KEY,
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    color VARCHAR(50),
    odometer INT,
    status VARCHAR(50) NOT NULL CHECK (status in ('rented', 'maintenance', 'available')),
    vtname VARCHAR(50),
    location VARCHAR(50),
    city VARCHAR(50),
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname)
);

CREATE TABLE Return (
    rid BIGINT PRIMARY KEY REFERENCES Rental (rid),
    date DATE,
    time TIME,
    odometer INT,
    fulltank BOOLEAN,
    value BIGINT
);