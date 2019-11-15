CREATE TABLE Equipment (
    eid INT PRIMARY KEY,
    etname VARCHAR(50),
    status VARCHAR(15) NOT NULL CHECK (status in ('available', 'rented', 'not_available')),
    location VARCHAR(50),
    city VARCHAR(50),
    FOREIGN KEY (location, city) REFERENCES Branch(location, city),
    FOREIGN KEY (etname) REFERENCES EquipType(etname)
);