// File for fetch functions
module.exports.getVehicle = getVehicle;
module.exports.createCustomer = createCustomer;
module.exports.createReserve = createReserve;

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
    } else if (isNaN(cellphone)) {
        alert("Cellphone needs to be a valid phone number");
        throw Error("Missing required rental information.");
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
        console.log(content.error);
        alert("New Untracked Error in createCustomer.");
        throw Error(content.error);
    } else {
        return dlicense;
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
    console.log("starting fetch");
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