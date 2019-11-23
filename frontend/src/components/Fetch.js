// File for fetch functions

async function getVehicle(body) {
    const query = Object.keys(body).map(function (key) {
        return key + '=' + encodeURIComponent(body[key]);
    }).join('&');

    const response = await fetch("http://localhost:8080/vehicle/get/?" + query);

    const content = await response.json();
    if (content.error) {
        if (content.error.hasOwnProperty("message")) {
            alert(console.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In getVehicle: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content);
    }
}

async function getReserve(confno) {
    if (confno.length === 0) {
        alert("Missing required get reserve information: Confirmation Number.");
        throw Error("Missing required get reserve information.");
    }

    const query = 'confno=' + encodeURIComponent(confno);

    const response = await fetch("http://localhost:8080/reserve/get/?" + query);

    const content = await response.json();
    if (content.error) {
        if (content.error.hasOwnProperty("message")) {
            alert(console.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In getReserve: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function createReserve(vtname, dlicense, location, city, fromdate, todate, fromtime, totime) {
    if (vtname.length === 0) {
        alert("Missing required reserve information: Vehicle Type.");
        throw Error("Missing required reserve information.");
    } else if (dlicense.length === 0) {
        alert("Missing required reserve information: Driver License.");
        throw Error("Missing required reserve information.");
    } else if (location.length === 0) {
        alert("Missing required reserve information: Location.");
        throw Error("Missing required reserve information.");
    } else if (city.length === 0) {
        alert("Missing required reserve information: City.");
        throw Error("Missing required reserve information.");
    } else if (fromdate.length === 0) {
        alert("Missing required reserve information: Start Date.");
        throw Error("Missing required reserve information.");
    } else if (todate.length === 0) {
        alert("Missing required reserve information: End Date.");
        throw Error("Missing required reserve information.");
    } else if (fromtime.length === 0) {
        alert("Missing required reserve information: Start Time.");
        throw Error("Missing required reserve information.");
    } else if (totime.length === 0) {
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
        if (content.error.hasOwnProperty("message")) {
            alert(content.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        console.log(content.error);
        alert("New Untracked Error In createReserve: " + content.error.detail);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function getCustomer(dlicense) {
    if (dlicense.length === 0) {
        alert("Missing required get customer information: Driver License.");
        throw Error("Missing required get customer information.");
    }

    const query = 'dlicense=' + encodeURIComponent(dlicense);

    const response = await fetch("http://localhost:8080/customer/get/?" + query);

    const content = await response.json();
    if (content.error) {
        if (content.error.hasOwnProperty("message")) {
            alert(console.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In getCustomer: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function createCustomer(name, cellphone, address, dlicense) {
    console.log(name);
    if (name.length === 0) {
        alert("Missing required customer information: Name.");
        throw Error("Missing required customer information.");
    } else if (cellphone.length === 0) {
        alert("Missing required customer information: Cellphone.");
        throw Error("Missing required customer information.");
    } else if (address.length === 0) {
        alert("Missing required customer information: Address.");
        throw Error("Missing required customer information.");
    } else if (dlicense.length === 0) {
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
        if (content.error.hasOwnProperty("message")) {
            alert(console.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In createCustomer: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function getRent(rid) {
    if (rid.length === 0) {
        alert("Missing required get customer information: Driver License.");
        throw Error("Missing required get customer information.");
    }

    const query = 'rid=' + encodeURIComponent(rid);

    const response = await fetch("http://localhost:8080/rent/get/?" + query);

    const content = await response.json();
    if (content.error) {
        if (content.error.hasOwnProperty("message")) {
            alert(console.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In getRent: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function createRent(vlicense, dlicense, fromdate, todate, fromtime, totime, odometer, cardname, cardno, expdate, confno) {
    if (vlicense.length !== 6) {
        alert("Missing required rental information: Vehicle License.");
        throw Error("Missing required rental information.");
    } else if (dlicense.length === 0) {
        alert("Missing required rental information: Driver License.");
        throw Error("Missing required rental information.");
    } else if (fromdate.length === 0) {
        alert("Missing required rental information: Start Date.");
        throw Error("Missing required rental information.");
    } else if (todate.length === 0) {
        alert("Missing required rental information: End Date.");
        throw Error("Missing required rental information.");
    } else if (fromtime.length === 0) {
        alert("Missing required rental information: Start Time.");
        throw Error("Missing required rental information.");
    } else if (totime.length === 0) {
        alert("Missing required rental information: End Time.");
        throw Error("Missing required rental information.");
    } else if (odometer.length === 0) {
        alert("Missing required rental information: Odometer.");
        throw Error("Missing required rental information.");
    } else if (cardname.length === 0) {
        alert("Missing required rental information: Card Name.");
        throw Error("Missing required rental information.");
    } else if (cardno.length === 0) {
        alert("Missing required rental information: Card Number.");
        throw Error("Missing required rental information.");
    } else if (expdate.length === 0) {
        alert("Missing required rental information: Expiration Date.");
        throw Error("Missing required rental information.");
    } else if (confno.length === 0) {
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
        if (content.error.hasOwnProperty("message")) {
            alert(console.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In createRent: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function createReturn(rid, date, time, odometer, fulltank, value) {
    if (rid.length === 0) {
        alert("Missing required return information: Rent ID.");
        throw Error("Missing required return information.");
    } else if (date.length === 0) {
        alert("Missing required return information: Return Date.");
        throw Error("Missing required return information.");
    } else if (time.length === 0) {
        alert("Missing required return information: Return Time.");
        throw Error("Missing required return information.");
    } else if (odometer.length === 0) {
        alert("Missing required return information: Odometer.");
        throw Error("Missing required return information.");
    } else if (fulltank.length === 0) {
        alert("Missing required return information: Fulltank Boolean.");
        throw Error("Missing required return information.");
    } else if (value.length === 0) {
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
        if (content.error.hasOwnProperty("message")) {
            alert(content.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In createReturn: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function getDailyRental(date) {
    if (date.length === 0) {
        alert("Missing required daily rental report information: Date.");
        throw Error("Missing required daily report information.");
    }

    const query = 'date=' + encodeURIComponent(date);

    const response = await fetch("http://localhost:8080/report/rental/?" + query);

    const content = await response.json();
    if (content.error) {
        if (content.error.hasOwnProperty("message")) {
            alert(content.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In getDailyRentals: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function getDailyBranchRental(date, location, city) {
    if (date.length === 0) {
        alert("Missing required daily rental report by branch information: Date.");
        throw Error("Missing required daily rental report by branch information.");
    } else if (location.length === 0) {
        alert("Missing required daily rental report by branch information: Location.");
        throw Error("Missing required daily rental report by branch information.");
    } else if (city.length === 0) {
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
        if (content.error.hasOwnProperty("message")) {
            alert(content.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In getDailyRentalsByBranch: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function getDailyReturn(date) {
    if (date.length === 0) {
        alert("Missing required daily return report information: Date.");
        throw Error("Missing required daily return report information.");
    }

    const query = 'date=' + encodeURIComponent(date);

    const response = await fetch("http://localhost:8080/report/return/?" + query);

    const content = await response.json();
    if (content.error) {
        if (content.error.hasOwnProperty("message")) {
            alert(content.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In getDailyReturns: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

async function getDailyBranchReturn(date, location, city) {
    if (date.length === 0) {
        alert("Missing required daily return report by branch information: Date.");
        throw Error("Missing required daily return report by branch information.");
    } else if (location.length === 0) {
        alert("Missing required daily return report by branch information: Location.");
        throw Error("Missing required daily return report by branch information.");
    } else if (city.length === 0) {
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
        if (content.error.hasOwnProperty("message")) {
            alert(content.error.message);
            console.log(content.error);
            throw Error(content.error);
        }
        alert("New Untracked Error In getDailyReturnsByBranch: " + content.error.detail);
        console.log(content.error);
        throw Error(content.error);
    } else {
        return (content.data);
    }
}

module.exports = {
    getVehicle,
    getReserve,
    createReserve,
    getCustomer,
    createCustomer,
    getRent,
    createRent,
    createReturn,
    getDailyRental,
    getDailyBranchRental,
    getDailyReturn,
    getDailyBranchReturn
};