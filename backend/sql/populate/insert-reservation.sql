INSERT INTO reservation(vtname, dlicense, fromdate, todate, fromtime, totime)
VALUES ('SUV', 'ONEFINGER', '20190101', '20190201', '12:00:00',
        '12:00:00') RETURNING confno