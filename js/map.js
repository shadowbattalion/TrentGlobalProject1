let singapore = [1.29,103.85]; // #1 Singapore latlng
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





async function carParkStatus(carpark_number){

    let response_cp_avail = await axios.get("https://api.data.gov.sg/v1/transport/carpark-availability");

    return response_cp_avail.data

}


function resolve_carpark_number(data, carpark_number){
    
    let chosen_carpak_status={}

    for (let status of data.items[0].carpark_data){
 
        if(status.carpark_number === carpark_number){
            chosen_carpak_status = status
            break
        } else {

            chosen_carpak_status = null

        }
        
    }

    return chosen_carpak_status
}



async function findCarPark(){

    

    let response = await axios.get("csv/hdb-carpark-information.csv");
    let hdb_json_info_list = await csv().fromString(response.data);
    let data = await carParkStatus()

      

    let carParkMarkerCluster = L.markerClusterGroup()
    for(let hdb_json_info of hdb_json_info_list){
        
        let status = resolve_carpark_number(data, hdb_json_info.car_park_no)
        
        let display_status =  {
                                "available_lots" : "No information found",
                                "total_lots": "No information found"
                                }
        if (status){
       
            display_status = {
                                "available_lots":status.carpark_info[0].lots_available,
                                "total_lots":status.carpark_info[0].total_lots
                                }
        }

        let lat = hdb_json_info.x_coord
        let lng = hdb_json_info.y_coord
        // console.log(lat, lng)

        var LeafIcon = L.Icon.extend({
            options: {
               
                iconSize:     [60, 70],
                shadowSize:   [0, 0],
                iconAnchor:   [15, 70],
                shadowAnchor: [0, 0],
                popupAnchor:  [0, -60]
            }
        });

        var greenIcon = new LeafIcon({iconUrl: 'images/full_100.png'})

        let carParkMarker = L.marker(svy21ToWgs84(lng, lat),{"icon":greenIcon})

        carParkMarker.bindPopup(`<h3 class="carpark_number">${hdb_json_info.address}</h3> <p> Carpark Number: ${hdb_json_info.car_park_no} <br> Available Lots: ${display_status["available_lots"]} <br> Total Lots: ${display_status["total_lots"]} </p><button class="refresh-btn">Refresh</button>`) //Check if refresh-btn attr should be class or id
       

        carParkMarker.addTo(carParkMarkerCluster)
      

    }

    carParkMarkerCluster.addTo(map)
  
}


findCarPark()


// let refresh_btn = document.querySelector(".refresh-btn")
// refresh_btn.addEventListener("click", function(){

//     // let status = await carParkStatus(hdb_json_info.car_park_no)
//     // carParkMarker.bindPopup(`<p>${hdb_json_info.car_park_no} ${hdb_json_info.address} ${status}</p><button class="refresh-btn">Refresh</button>`) //Check if refresh-btn attr should be class or id
    
//     let carpark_number = document.querySelector(".carpark_number")
//     console.log(carpark_number)

//     })






