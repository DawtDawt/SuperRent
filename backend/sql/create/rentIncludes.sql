CREATE TABLE Rent_Includes(
    rid BIGINT,
    eid BIGINT,
    PRIMARY KEY (rid, eid),
    FOREIGN KEY (rid) REFERENCES Rent(rid),
    FOREIGN KEY (eid) REFERENCES Equipment(eid)
);