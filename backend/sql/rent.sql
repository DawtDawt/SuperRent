CREATE TABLE RENT(
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
)