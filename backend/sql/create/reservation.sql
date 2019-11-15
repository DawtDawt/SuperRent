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