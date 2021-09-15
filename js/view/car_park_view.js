async function generateCarParkLayer(car_park_list,car_park_status_list,car_park_layer, map){

    car_park_layer.clearLayers()
    // console.log(car_park_list.result.records)

    let carParkMarkerCluster = L.markerClusterGroup()
    for(let car_park of car_park_list.result.records){
       
        let status = resolve_carpark_number(car_park_status_list, car_park.car_park_no)
        
        if(status){
         
            for (let i = 0;  i < status.carpark_info.length; i++){
            
                let display_status =  {
                                        "available_lots" : "No information found",
                                        "total_lots": "No information found",
                                        "occupied_lots": "No information found",
                                        "percentage_lots":null,
                                        "last_updated": null,
                                        "car_park_type":"No information found"
                                        }
                if (status){
            
                    display_status = {
                                        "available_lots":parseInt(status.carpark_info[i].lots_available), 
                                        "total_lots":parseInt(status.carpark_info[i].total_lots),
                                        "occupied_lots": parseInt(status.carpark_info[i].total_lots) - parseInt(status.carpark_info[i].lots_available),
                                        "percentage_lots":((status.carpark_info[i].total_lots-status.carpark_info[i].lots_available)/status.carpark_info[i].total_lots)*100,
                                        "last_updated":status.update_datetime,
                                        "car_park_type":status.carpark_info[i].lot_type
                                        }
                }

                let lat = car_park.x_coord
                let lng = car_park.y_coord
            
                // console.log(display_status["percentage_lots"])
                var modified_icon = L.icon({
                        iconUrl:      percentage_to_icon(display_status["percentage_lots"]),
                        iconSize:     [80, 80],
                        iconAnchor:   [27, 75],
                        popupAnchor:  [0, -60]

                    });



                if (display_status["car_park_type"]==="H"){
                    console.log(display_status["car_park_type"]==="H")
                    let carParkMarker = L.marker(svy21ToWgs84(lng, lat),{"icon":modified_icon})

                    carParkMarker.bindPopup(`<h3 id="carpark_number">${car_park.address}</h3> <p> Carpark Number: ${car_park.car_park_no} <br> Available Lots: ${display_status["available_lots"]} <br> Occupied Lots: ${display_status["occupied_lots"]} <br> Total Lots: ${display_status["total_lots"]} <br> Last updated: ${last_updated_duration(display_status["last_updated"])} <br> Car Park Type: ${display_status["car_park_type"]}  <br> <button onclick="refresh()">Refresh</button> </p>`) //Check if refresh-btn attr should be class or id
                

                    carParkMarker.addTo(carParkMarkerCluster)
                }
            }
        }
    }

    carParkMarkerCluster.addTo(car_park_layer)
    
    car_park_layer.addTo(map)

}



function last_updated_duration(datetime){
    
    if (datetime){
        let last_updated = new Date(datetime.split("T")[0]+" "+datetime.split("T")[1]).getTime()
        let current_time = new Date().getTime()
        let duration = Math.floor((current_time-last_updated)/60000)
        if (duration>=60){
            duration_hour = Math.floor(duration/60)
            duration_minute = duration%60
            return `${duration_hour} hour ${duration_minute} mins ago.`
        }
        return `${duration} mins ago`
    }
    return "No information"

}



// function refresh(){

//     let status = await carParkStatus(hdb_json_info.car_park_no)
//     carParkMarker.bindPopup(`<p>${hdb_json_info.car_park_no} ${hdb_json_info.address} ${status}</p><button class="refresh-btn">Refresh</button>`) //Check if refresh-btn attr should be class or id
    
//     let carpark_number = document.querySelector(".carpark_number")
//     console.log("test")
//     findCarPark(carParkLayer)
    

//     }