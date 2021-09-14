async function generateCarParkLayer(car_park_list,car_park_status_list,car_park_layer, map){

    car_park_layer.clearLayers()
    // console.log(car_park_list.result.records)

    let carParkMarkerCluster = L.markerClusterGroup()
    for(let car_park of car_park_list.result.records){
        console.log(car_park.car_park_no)
        let status = resolve_carpark_number(car_park_status_list, car_park.car_park_no)
        // console.log(status)
        
        let display_status =  {
                                "available_lots" : "No information found",
                                "total_lots": "No information found",
                                "occupied_lots": "No information found",
                                "percentage_lots":null,
                                "last_updated_date": "Information found",
                                "last_updated_time": "Information found"
                                }
        if (status){
       
            display_status = {
                                "available_lots":parseInt(status.carpark_info[0].lots_available), 
                                "total_lots":parseInt(status.carpark_info[0].total_lots),
                                "occupied_lots": parseInt(status.carpark_info[0].total_lots) - parseInt(status.carpark_info[0].lots_available),
                                "percentage_lots":((status.carpark_info[0].total_lots-status.carpark_info[0].lots_available)/status.carpark_info[0].total_lots)*100,
                                "last_updated_date":status.update_datetime.split("T")[0],
                                "last_updated_time":status.update_datetime.split("T")[1]
                                }
        }

        let lat = car_park.x_coord
        let lng = car_park.y_coord
     
        // console.log(display_status["percentage_lots"])
        var modified_icon = L.icon({
                iconUrl:      percentage_to_icon(display_status["percentage_lots"]),
                iconSize:     [80, 80],
                shadowSize:   [0, 0],
                iconAnchor:   [27, 75],
                shadowAnchor: [0, 0],
                popupAnchor:  [0, -60]

            });




        let carParkMarker = L.marker(svy21ToWgs84(lng, lat),{"icon":modified_icon})

        carParkMarker.bindPopup(`<h3 id="carpark_number">${car_park.address}</h3> <p> Carpark Number: ${car_park.car_park_no} <br> Available Lots: ${display_status["available_lots"]} <br> Occupied Lots: ${display_status["occupied_lots"]} <br> Total Lots: ${display_status["total_lots"]} <br> Last updated date: ${display_status["last_updated_date"]} <br> Last updated time: ${display_status["last_updated_time"]} <br> <button onclick="refresh()">Refresh</button> </p>`) //Check if refresh-btn attr should be class or id
       

        carParkMarker.addTo(carParkMarkerCluster)
      

    }

    carParkMarkerCluster.addTo(car_park_layer)
    
    car_park_layer.addTo(map)

}