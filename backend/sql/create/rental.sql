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