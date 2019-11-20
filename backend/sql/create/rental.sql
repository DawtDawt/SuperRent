CREATE TABLE Rental(
    rid BIGSERIAL PRIMARY KEY,
    vlicense VARCHAR(6),
    dlicense VARCHAR(50),
    fromdate DATE,
    todate DATE,
    fromtime TIME,
    totime TIME,
    odometer INT,
    cardname VARCHAR(50),
    cardno BIGINT,
    expdate DATE,
    confno BIGINT,
    FOREIGN KEY (vlicense) REFERENCES Vehicle(vlicense),
    FOREIGN KEY (dlicense) REFERENCES Customer(dlicense),
    FOREIGN KEY (confno) REFERENCES Reservation(confno)
);