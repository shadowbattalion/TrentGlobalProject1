let singapore = [ 1.29,103.85]; // #1 Singapore latlng
let map = L.map('map').setView(singapore, 13); // #2 Set the center point

// setup the tile layers
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);


async function findCarPark(){
    // let data = await loadData()
    // let coordinates=data.Result

    let searchResultLayer = L.layerGroup()
    let carParkMarker = L.marker([28716.2498, 32600.2734])
    // carParkMarker.addTo(searchResultLayer)


    // for(let coordinate of coordinates){
    //     let coordinate_string = coordinate.geometries[0].coordinates
    //     let lat = coordinate_string.split(",")[0]
    //     let lng = coordinate_string.split(",")[1]
    //     console.log(lat,lng)
    //     let carParkMarker = L.marker([lat,lng])
    //     carParkMarker.addTo(searchResultLayer)

    // }

    carParkMarker.addTo(map)

}

// findCarPark()

let carParkMarker = L.marker([28716.24, 32600.27])
carParkMarker.addTo(map)