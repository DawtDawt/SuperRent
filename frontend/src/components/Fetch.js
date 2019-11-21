// File for fetch functions
module.exports.getVehicle = getVehicle;
module.exports.createCustomer = createCustomer;
module.exports.createReserve = createReserve;
module.exports.createRent = createRent;
module.exports.createReturn = createReturn;
module.exports.getDailyRental = getDailyRentals;
module.exports.getDailyRentalByBranch = getDailyRentalsByBranch;
module.exports.getDailyReturn = getDailyReturns;
module.exports.getDailyReturnsByBranch = getDailyReturnsByBranch;

async function getVehicle(body) {
    const query = Object.keys(body).map(function (key) {
        return key + '=' + encodeURIComponent(body[key]);
    }).join('&');

    const response = await fetch("http://localhost:8080/vehicle/get/?" + query);

    return response.json();
}

async function createCustomer(name, cellphone, address, dlicense) {
    if (!name) {
        alert("Missing required customer information: Name.");
        throw Error("Missing required customer information.");
    } else if (!cellphone) {
        alert("Missing required customer information: Cellphone.");
        throw Error("Missing required customer information.");
    } else if (!address) {
        alert("Missing required customer information: Address.");
        throw Error("Missing required customer information.");
    } else if (!dlicense) {
        alert("Missing required customer information: Driver License.");
        throw Error("Missing required customer information.");
    }

    const response = await fetch("http://localhost:8080/customer/create", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            cellphone,
            address,
            dlicense,
        })
    });

    const content = await response.json();
    if (content.error) {
        if (content.error.code === "23505") {
            alert("The given driver's license is already associated with an existing customer account.");
            console.log(content.error);
            throw Error(content.error);
        }
        if (content.error.code === "22P02") {
            alert("Invalid cellphone number.");
            console.log(content.error);
            throw Error(content.error);
        }
        console.log(content.error);
        alert("New Untracked Error in createCustomer.");
        throw Error(content.error);
    } else {
        return content.data;
    }
}

async function createReserve(vtname, dlicense, location, city, fromdate, todate, fromtime, totime) {
    if (!vtname) {
        alert("Missing required reserve information: Vehicle Type.");
        throw Error("Missing required reserve information.");
    } else if (!dlicense) {
        alert("Missing required reserve information: Driver License.");
        throw Error("Missing required reserve information.");
    } else if (!location) {
        alert("Missing required reserve information: Location.");
        throw Error("Missing required reserve information.");
    } else if (!city) {
        alert("Missing required reserve information: City.");
        throw Error("Missing required reserve information.");
    } else if (!fromdate) {
        alert("Missing required reserve information: Start Date.");
        throw Error("Missing required reserve information.");
    } else if (!todate) {
        alert("Missing required reserve information: End Date.");
        throw Error("Missing required reserve information.");
    } else if (!fromtime) {
        alert("Missing required reserve information: Start Time.");
        throw Error("Missing required reserve information.");
    } else if (!totime) {
        alert("Missing required reserve information: End Time.");
        throw Error("Missing required reserve information.");
    }

    const response = await fetch("http://localhost:8080/reserve/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            vtname,
            dlicense,
            location,
            city,
            fromdate,
            todate,
            fromtime,
            totime
        })
    });

    const content = await response.json();
    if (content.error) {
        if (content.error.code === "23503") {
            alert("No customer were found under the given driver's license.");
            console.log(content.error);
            throw Error(content.error);
        }
        if (content.error.code === "RESALREXIS") {
            alert(content.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        console.log(content.error);
        alert("New Untracked Error In createReserve.");
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function createRent(vlicense, dlicense, fromdate, todate, fromtime, totime, odometer, cardname, cardno, expdate, confno) {
    if (!vlicense) {
        alert("Missing required rental information: Vehicle License.");
        throw Error("Missing required rental information.");
    } else if (!dlicense) {
        alert("Missing required rental information: Driver License.");
        throw Error("Missing required rental information.");
    } else if (!fromdate) {
        alert("Missing required rental information: Start Date.");
        throw Error("Missing required rental information.");
    } else if (!todate) {
        alert("Missing required rental information: End Date.");
        throw Error("Missing required rental information.");
    } else if (!fromtime) {
        alert("Missing required rental information: Start Time.");
        throw Error("Missing required rental information.");
    } else if (!totime) {
        alert("Missing required rental information: End Time.");
        throw Error("Missing required rental information.");
    } else if (!odometer) {
        alert("Missing required rental information: Odometer.");
        throw Error("Missing required rental information.");
    } else if (!cardname) {
        alert("Missing required rental information: Card Name.");
        throw Error("Missing required rental information.");
    } else if (!cardno) {
        alert("Missing required rental information: Card Number.");
        throw Error("Missing required rental information.");
    } else if (!expdate) {
        alert("Missing required rental information: Expiration Date.");
        throw Error("Missing required rental information.");
    } else if (!confno) {
        alert("Missing required rental information: Confirmation Number.");
        throw Error("Missing required rental information.");
    }

    const response = await fetch("http://localhost:8080/rent/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            vlicense,
            dlicense,
            fromdate,
            todate,
            fromtime,
            totime,
            odometer,
            cardname,
            cardno,
            expdate,
            confno
        })
    });

    const content = await response.json();
    if (content.error) {
        console.log(content.error);
        alert("New Untracked Error In createRent.");
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function createReturn(rid, date, time, odometer, fulltank, value) {
    if (!rid) {
        alert("Missing required return information: Rent ID.");
        throw Error("Missing required return information.");
    } else if (!date) {
        alert("Missing required return information: Return Date.");
        throw Error("Missing required return information.");
    } else if (!time) {
        alert("Missing required return information: Return Time.");
        throw Error("Missing required return information.");
    } else if (!odometer) {
        alert("Missing required return information: Odometer.");
        throw Error("Missing required return information.");
    } else if (!fulltank) {
        alert("Missing required return information: Fulltank Boolean.");
        throw Error("Missing required return information.");
    } else if (!value) {
        alert("Missing required return information: Value of Return.");
        throw Error("Missing required return information.");
    }

    const response = await fetch("http://localhost:8080/return/create", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rid,
            date,
            time,
            odometer,
            fulltank,
            value
        })
    });

    const content = await response.json();
    if (content.error) {
        console.log(content.error);
        alert("New Untracked Error In createReturn.");
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function getDailyRentals(date) {
    if (!date) {
        alert("Missing required daily rental report information: Date.");
        throw Error("Missing required daily report information.");
    }

    const query = 'date=' + encodeURIComponent(date);

    const response = await fetch("http://localhost:8080/report/rental/?" + query);

    const content = await response.json();
    if (content.error) {
        console.log(content.error);
        alert("New Untracked Error In getDailyRentals.");
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function getDailyRentalsByBranch(date, location, city) {
    if (!date) {
        alert("Missing required daily rental report by branch information: Date.");
        throw Error("Missing required daily rental report by branch information.");
    } else if (!location) {
        alert("Missing required daily rental report by branch information: Location.");
        throw Error("Missing required daily rental report by branch information.");
    } else if (!city) {
        alert("Missing required daily rental report by branch information: City.");
        throw Error("Missing required daily rental report by branch information.");
    }

    const body = {date: date, location: location, city: city};
    const query = Object.keys(body).map(function (key) {
        return key + '=' + encodeURIComponent(body[key]);
    }).join('&');

    const response = await fetch("http://localhost:8080/report/rental/branch/?" + query);

    const content = await response.json();
    if (content.error) {
        console.log(content.error);
        alert("New Untracked Error In getDailyRentalsByBranch.");
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function getDailyReturns(date) {
    if (!date) {
        alert("Missing required daily return report information: Date.");
        throw Error("Missing required daily return report information.");
    }

    const query = 'date=' + encodeURIComponent(date);

    const response = await fetch("http://localhost:8080/report/return/?" + query);

    const content = await response.json();
    if (content.error) {
        console.log(content.error);
        alert("New Untracked Error In getDailyReturns.");
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function getDailyReturnsByBranch(date, location, city) {
    if (!date) {
        alert("Missing required daily return report by branch information: Date.");
        throw Error("Missing required daily return report by branch information.");
    } else if (!location) {
        alert("Missing required daily return report by branch information: Location.");
        throw Error("Missing required daily return report by branch information.");
    } else if (!city) {
        alert("Missing required daily return report by branch information: City.");
        throw Error("Missing required daily return report by branch information.");
    }

    const body = {date: date, location: location, city: city};
    const query = Object.keys(body).map(function (key) {
        return key + '=' + encodeURIComponent(body[key]);
    }).join('&');

    const response = await fetch("http://localhost:8080/report/return/branch/?" + query);

    const content = await response.json();
    if (content.error) {
        console.log(content.error);
        alert("New Untracked Error In getDailyReturnsByBranch.");
        throw Error(content.error);
    } else {
        return (content.data);
    }
}