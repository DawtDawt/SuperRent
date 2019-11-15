CREATE TABLE ClubMember (
    cellphone BIGINT PRIMARY KEY REFERENCES Customer(cellphone),
    points BIGINT,
    fees BIGINT
);