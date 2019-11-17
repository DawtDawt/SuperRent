CREATE TABLE Return (
    rid BIGINT PRIMARY KEY REFERENCES Rental (rid),
    date DATE,
    time TIME,
    odometer INT,
    fulltank BOOLEAN,
    value BIGINT
);