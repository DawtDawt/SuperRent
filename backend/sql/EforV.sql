CREATE TABLE EforV (
    etname VARCHAR(50),
    vtname VARCHAR(50),
    PRIMARY KEY(etname, vtname),
    FOREIGN Key (etname) REFERENCES EquipType (etname),
    FOREIGN KEY (vtname) REFERENCES VehicleType (vtname)
)