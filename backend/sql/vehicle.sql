CREATE TABLE Vehicle (
    vid VARCHAR(9) PRIMARY KEY,
    vlicense VARCHAR(6),
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    color VARCHAR(50),
    odometer INT,
    status CHAR(8) NOT NULL CHECK (status = 'for_sale' OR status = 'for_rent'),
    vtname VARCHAR(50),
    location VARCHAR(50),
    city VARCHAR(50),
    FOREIGN KEY (location, city) REFERENCES Branch(location, city),
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname)
);