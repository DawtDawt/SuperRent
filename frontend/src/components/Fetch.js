// File for fetch functions

export function getVehicle(body) {
    const query = Object.keys(body).map(function (key) {
        return key + '=' + encodeURIComponent(body[key]);
    }).join('&');
    return fetch("http://localhost:8080/vehicle/get/?" + query)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            // TODO
        })
}

export function createCustomer(name, cellphone, address, dlicense) {
    if (!name) {
        alert("Missing required rental information: Name.");
        throw Error("Missing required rental information.");
    } else if (!cellphone) {
        alert("Missing required rental information: Cellphone.");
        throw Error("Missing required rental information.");
    } else if (!address) {
        alert("Missing required rental information: Address.");
        throw Error("Missing required rental information.");
    } else if (!dlicense) {
        alert("Missing required rental information: Driver License.");
        throw Error("Missing required rental information.");
    } else if (isNaN(cellphone)) {
        alert("Cellphone needs to be a valid phone number");
        throw Error("Missing required rental information.");
    }

    return fetch("http://localhost:8080/customer/create", {
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
    }).then(content => {
        if (content.error) {
            alert("Customer already exists");
            throw Error(content.error);
        } else {
            return dlicense;
        }
    })
}