CREATE TABLE Reservation (
    confno BIGSERIAL PRIMARY KEY,
    vtname VARCHAR(50),
    dlicense VARCHAR(50),
    location VARCHAR(50),
    city VARCHAR(50),
    fromdate DATE,
    todate DATE,
    fromtime TIME,
    totime TIME,
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname),
    FOREIGN KEY (dlicense) REFERENCES Customer(dlicense)
);