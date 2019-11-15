CREATE TABLE Branch (
    location TEXT,
    city VARCHAR(50),
    PRIMARY KEY (location, city)
);

CREATE TABLE Customer (
    cellphone BIGINT PRIMARY KEY,
    name VARCHAR(255),
    address TEXT,
    dlicense VARCHAR(50)
);

CREATE TABLE ClubMember (
    cellphone BIGINT PRIMARY KEY REFERENCES Customer(cellphone),
    points BIGINT,
    fees BIGINT
);

CREATE TABLE EquipType (
    etname VARCHAR(50) PRIMARY KEY,
    drate INT,
    hrate INT
);

CREATE TABLE Equipment (
    eid INT PRIMARY KEY,
    etname VARCHAR(50),
    status VARCHAR(15) NOT NULL CHECK (status in ('available', 'rented', 'not_available')),
    location VARCHAR(50),
    city VARCHAR(50),
    FOREIGN KEY (location, city) REFERENCES Branch(location, city),
    FOREIGN KEY (etname) REFERENCES EquipType(etname)
);

CREATE TABLE VehicleType(
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

CREATE TABLE Vehicle (
    vid VARCHAR(9) PRIMARY KEY,
    vlicense VARCHAR(6),
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    color VARCHAR(50),
    odometer INT,
    status CHAR(8) NOT NULL CHECK (status = 'for_sale' OR status = 'for_rent'),
    vtname VARCHAR(50),
    location VARCHAR(50),
    city VARCHAR(50),
    FOREIGN KEY (location, city) REFERENCES Branch(location, city),
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname)
);

CREATE TABLE TimePeriod(
    fromDate DATE,
    toDate DATE,
    fromTime TIME,
    toTime TIME,
    PRIMARY KEY (fromDate, toDate, fromTime, toTime)
);

CREATE TABLE Reservation (
    confNo BIGINT PRIMARY KEY,
    vtname VARCHAR(50),
    cellphone BIGINT,
    fromDate DATE,
    toDate DATE,
    fromTime TIME,
    toTime TIME,
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname),
    FOREIGN KEY (cellphone) REFERENCES Customer(cellphone),
    FOREIGN KEY (fromDate, toDate, fromTime, toTime) REFERENCES TimePeriod(fromDate, toDate, fromTime, toTime)
);

CREATE TABLE Reserve_Includes (
    confNo BIGINT,
    etname VARCHAR(50),
    PRIMARY KEY (confNo, etname),
    FOREIGN KEY (confNo) REFERENCES Reservation(confNo),
    FOREIGN KEY (etname) REFERENCES EquipType(etname)
);

CREATE TABLE Rent(
    rid BIGINT PRIMARY KEY,
    vid BIGINT,
    cellphone BIGINT,
    fromDate DATE,
    toDate DATE,
    fromTime TIME,
    toTime TIME,
    odometer INT,
    cardName VARCHAR(50),
    cardNo BIGINT,
    ExpDate DATE,
    confNo BIGINT,
    -- FOREIGN KEY (vid) REFERENCES 
    FOREIGN KEY (cellphone) REFERENCES Customer(cellphone),
    FOREIGN KEY (fromDate, toDate, fromTime, toTime) REFERENCES TimePeriod(fromDate, toDate, fromTime, toTime),
    FOREIGN KEY (confNo) REFERENCES Reservation(confNo)
);

CREATE TABLE Return (
    rid BIGINT PRIMARY KEY REFERENCES Rent(rid),
    date DATE,
    time TIME,
    odometer INT,
    fulltank BOOLEAN,
    value BIGINT
);

CREATE TABLE Rent_Includes(
    rid BIGINT,
    eid BIGINT,
    PRIMARY KEY (rid, eid),
    FOREIGN KEY (rid) REFERENCES Rent(rid),
    FOREIGN KEY (eid) REFERENCES Equipment(eid)
);

CREATE TABLE EforV (
    etname VARCHAR(50),
    vtname VARCHAR(50),
    PRIMARY KEY(etname, vtname),
    FOREIGN Key (etname) REFERENCES EquipType (etname),
    FOREIGN KEY (vtname) REFERENCES VehicleType (vtname)
);