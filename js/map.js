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





function percentage_to_icon(percentange){

    let icon = ""

    if(percentage===100){

        icon="images/full_100.png"

    }else if(percentange >= 90 && percentange < 100){

        icon="images/full_90.png"

    }else if(percentange >= 80 && percentange < 90){

        icon="images/full_80.png"
        
    }else if(percentange >= 70 && percentange < 80){

        icon="images/full_70.png"
        
    }else if(percentange >= 60 && percentange < 70){

        icon="images/full_60.png"
        
    }else if(percentange >= 50 && percentange < 60){

        icon="images/full_50.png"
        
    }else if(percentange >= 40 && percentange < 50){

        icon="images/full_40.png"
        
    }else if(percentange >= 30 && percentange < 40){

        icon="images/full_30.png"
        
    }else if(percentange >= 20 && percentange < 30){

        icon="images/full_20.png"
        
    }else if(percentange >= 10 && percentange < 20){

        icon="images/full_10.png"
        
    }else if(percentange >= 0 && percentange < 10){

        icon="images/full_0.png"
        
    }else{

        icon="images/full_null.png"
    }


    return icon


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
                                "total_lots": "No information found",
                                "percentage_lots":0
                                }
        if (status){
       
            display_status = {
                                "available_lots":parseInt(status.carpark_info[0].lots_available),
                                "total_lots":parseInt(status.carpark_info[0].total_lots),
                                "percentage_lots":(status.carpark_info[0].lots_available/status.carpark_info[0].total_lots)*100
                                }
        }

        let lat = hdb_json_info.x_coord
        let lng = hdb_json_info.y_coord
     
        
        var modified_icon = L.icon({
                iconUrl:      percentage_to_icon(display_status["percentage_lots"]),
                iconSize:     [80, 80],
                shadowSize:   [0, 0],
                iconAnchor:   [27, 75],
                shadowAnchor: [0, 0],
                popupAnchor:  [0, -60]

            });




        let carParkMarker = L.marker(svy21ToWgs84(lng, lat),{"icon":modified_icon})

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






