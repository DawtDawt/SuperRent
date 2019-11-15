CREATE TABLE Reserve_Includes (
    confNo BIGINT,
    etname VARCHAR(50),
    PRIMARY KEY (confNo, etname),
    FOREIGN KEY (confNo) REFERENCES Reservation(confNo),
    FOREIGN KEY (etname) REFERENCES EquipType(etname)
);