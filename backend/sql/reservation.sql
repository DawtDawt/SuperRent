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
)