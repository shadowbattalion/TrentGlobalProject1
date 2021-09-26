function initMap(){
    let singapore = [1.29,103.85]; // #1 Singapore latlng
    let map = L.map('map',{zoomControl: false}).setView(singapore, 13); // #2 Set the center point

    // setup the tile layers
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibXVoYW1tYWQtaGFmaXotdW1hciIsImEiOiJja3UxMnhoZ3cxMGt4MnZvdzcxaTlleTcxIn0.48LX7Seitbhdn0MNSTyZ0Q' 
    }).addTo(map);

    L.control.zoom({
        position:'bottomright'
    }).addTo(map);

    return map

}




















    





