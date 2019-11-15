CREATE TABLE TimePeriod(
    fromDate DATE, 
    toDate DATE,
    fromTime TIME,
    toTime TIME,
    PRIMARY KEY (fromDate, toDate, fromTime, toTime)
)