CREATE TABLE Return (
    rid BIGINT PRIMARY KEY REFERENCES Rent(rid),
    date DATE,
    time TIME,
    odometer INT,
    fulltank BOOLEAN,
    value BIGINT
);