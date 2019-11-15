CREATE TABLE Vehicle (
    vlicense VARCHAR(6) PRIMARY KEY,
    make VARCHAR(50),
    model VARCHAR(50),
    year INT,
    color VARCHAR(50),
    odometer INT,
    status VARCHAR(50) NOT NULL CHECK (status in ('rented', 'maintenance', 'available')),
    vtname VARCHAR(50),
    location VARCHAR(50),
    city VARCHAR(50),
    FOREIGN KEY (vtname) REFERENCES VehicleType(vtname)
);