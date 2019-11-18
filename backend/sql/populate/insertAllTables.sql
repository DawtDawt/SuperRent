INSERT INTO VehicleType
VALUES
    ('Economy', 'ELECTRIC', 200, 40, 30, 20, 10, 5, 1);

INSERT INTO VehicleType
VALUES
    ('Compact', 'ELECTRIC', 300, 40, 30, 20, 10, 5, 0.5);

INSERT INTO VehicleType
VALUES
    ('Mid-size', 'ELECTRIC', 400, 50, 30, 20, 10, 10, 0.5);

INSERT INTO VehicleType
VALUES
    ('Standard', 'ELECTRIC', 450, 50, 30, 30, 20, 10, 0.5);

INSERT INTO VehicleType
VALUES
    ('Full-size', 'ELECTRIC', 500, 70, 30, 40, 20, 10, 0.5);

INSERT INTO VehicleType
VALUES
    ('SUV', 'ELECTRIC', 600, 70, 30, 40, 20, 10, 0.5);

INSERT INTO VehicleType
VALUES
    ('Truck', 'ELECTRIC', 700, 70, 30, 40, 20, 10, 0.5);

INSERT INTO Vehicle
VALUES
    ('ABC000', 'Tesla', 'Model X', 2019, 'white', 1000,
        'available', 'SUV', 'UBC', 'Vancouver');

INSERT INTO Vehicle
VALUES
    ('ABC001', 'Toyota', 'Sienna', 2008, 'beige', 1000,
        'available', 'SUV', 'Kitsilano', 'Vancouver');

INSERT INTO Vehicle
VALUES
    ('ABC002', 'BMW', '330i', 2017, 'blue', 1000,
        'available', 'Standard', 'Dunbar', 'Vancouver');
INSERT INTO Vehicle
VALUES
    ('ABC003', 'Hyundai', 'Elantra', 2007, 'black', 1000,
        'available', 'Compact', 'Kerrisdale', 'Vancouver');
INSERT INTO Vehicle
VALUES
    ('ABC009', 'Tesla', 'Model 3', 2018, 'red', 1000,
        'available', 'Standard', 'Oakridge', 'Vancouver');
INSERT INTO Vehicle
VALUES
    ('ABC004', 'Mazda', '3', 2015, 'white', 1000,
        'available', 'Economy', 'Richmond Centre', 'Richmond');

INSERT INTO Vehicle
VALUES
    ('ABC005', 'Jaguar', 'F-Type', 2014, 'black', 1000,
        'available', 'Mid-size', 'Kingsway', 'Burnaby');
INSERT INTO Vehicle
VALUES
    ('ABC006', 'Tesla', 'Model X', 2019, 'white', 1000,
        'available', 'SUV', 'Metrotown', 'Burnaby');
INSERT INTO Vehicle
VALUES
    ('ABC007', 'Tesla', 'Model X', 2019, 'white', 1000,
        'available', 'SUV', 'Queens''s Park', 'Surrey');
INSERT INTO Vehicle
VALUES
    ('ABC008', 'Tesla', 'Model X', 2019, 'white', 1000,
        'available', 'SUV', 'Downtown', 'Vancouver');

INSERT INTO Customer
VALUES
    ('000000' , 778000000, 'John Doe', '123 Main St.'),
    ('000001' , 778000001, 'Bob Doe', '123 Main St.'),
    ('000002' , 778000002, 'Mary Doe', '123 Main St.'),
    ('000003' , 778000003, 'Elon Doe', '123 Main St.'),
    ('000004' , 778000004, 'Amy Doe', '123 Main St.'),
    ('000005' , 778000005, 'Johnson Doe', '123 Main St.'),
    ('000006' , 778000006, 'Alice Doe', '123 Main St.'),
    ('000007' , 778000007, 'Jane Doe', '123 Main St.'),
    ('000008' , 778000008, 'Musk Doe', '123 Main St.'),
    ('000009' , 778000009, 'Tony Doe', '123 Main St.');

INSERT INTO Reservation
VALUES
    (000000 , 'SUV', '000000', '2019-10-10', '2019-10-20', '12:00 AM', '3:00 PM'),
    (000001 , 'Compact', '000001', '2019-10-10', '2019-10-20', '12:00 AM', '3:00 PM'),
    (000002 , 'Economy', '000002', '2019-10-10', '2019-10-31', '12:00 AM', '3:00 PM'),
    (000003 , 'Standard', '000003', '2019-10-10', '2019-10-22', '12:00 AM', '3:00 PM'),
    (000004 , 'Full-size', '000004', '2019-10-10', '2019-10-28', '12:00 AM', '3:00 PM');


INSERT INTO Rental
VALUES
    (450, 'ABC000', '000000', '2019-10-15', '2019-10-30', '12:00 AM', '3:00PM', 130, 'John Doe', 888812345, '2030-10-10', 000000);

INSERT INTO Return
VALUES
(450, '2019-10-30', '3:00PM', 3000, TRUE, 2000);