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