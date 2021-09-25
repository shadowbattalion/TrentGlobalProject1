let range =  0.0018018018 // 200 m calculations: https://www.nhc.noaa.gov/gccalc.shtml
let car_park_search_area = 300
let button_200 = document.querySelector("#change-radius-1")
let button_300 = document.querySelector("#change-radius-2")
let button_400 = document.querySelector("#change-radius-3")

async function generateCarParkLayer(car_park_list, car_park_status_list, car_park_layer, map, coordinate){
    
    let car_park_statuses = []

    for(let car_park of car_park_list.result.records){
        
        car_park_statuses.push([car_park,resolve_carpark_number(car_park_status_list, car_park.car_park_no)])

    } 
    

    generateCarParkLayerDetachedFunction(car_park_layer, map, coordinate, car_park_statuses)

    L.circle(coordinate,{radius:car_park_search_area}).addTo(car_park_layer)

    document.querySelector("#change-radius-1").addEventListener('click', function(){
        button_200.classList.add("disabled")
        button_300.classList.remove("disabled")
        button_400.classList.remove("disabled")

        range = parseFloat(button_200.value)
        car_park_search_area = 300
        generateCarParkLayerDetachedFunction(car_park_layer, map, coordinate, car_park_statuses)

        L.circle(coordinate,{radius:car_park_search_area}).addTo(car_park_layer)
    })

    document.querySelector("#change-radius-2").addEventListener('click', function(){
        button_200.classList.remove("disabled")
        button_300.classList.add("disabled")
        button_400.classList.remove("disabled")

        range = parseFloat(document.querySelector("#change-radius-2").value)
        
        generateCarParkLayerDetachedFunction(car_park_layer, map, coordinate, car_park_statuses)
        car_park_search_area = 400
        L.circle(coordinate,{radius:car_park_search_area}).addTo(car_park_layer)
    })

    document.querySelector("#change-radius-3").addEventListener('click', function(){
        button_200.classList.remove("disabled")
        button_300.classList.remove("disabled")
        button_400.classList.add("disabled")

        range = parseFloat(document.querySelector("#change-radius-3").value)
        
        generateCarParkLayerDetachedFunction(car_park_layer, map, coordinate, car_park_statuses)
        car_park_search_area = 500
        L.circle(coordinate,{radius:car_park_search_area}).addTo(car_park_layer)
    })


}


function resolve_carpark_number(car_park_status_list, car_park_no){
    
    let chosen_carpak_status={}

    for (let status of car_park_status_list.items[0].carpark_data){
        
        // console.log(status)
        if(status.carpark_number === car_park_no){
            chosen_carpak_status = status
            break
        } else {

            chosen_carpak_status = null

        }
        
    }
    // console.log(chosen_carpak_status)
    return chosen_carpak_status
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





function icon_selector(percentage_lots, lot_type){

    let percentage_string = ""
    let lot_type_string = ""
    
    // console.log(percentage_lots && percentage_lots>=0)
    if(percentage_lots>=0 && percentage_lots!=NaN){
        // console.log(percentage_lots)
        percentages=['0','1','2','3','4','5','6','7','8','9','10']
        // console.log(Math.floor(percentage_lots/10))
        percentage_string=[Math.floor(percentage_lots/10)]

            
    }else{

        percentage_string="null" // No info because certain car parks returns a negative percentage or a NaN

    }

    lot_type_string = {
        "C":"car",
        "Y":"bike",
        "H":"lorry"
    }

    let png_file_string = `images/full_${percentage_string}_type_${lot_type_string[lot_type]}.png`

   
    let modified_icon = L.icon({
        iconUrl:      png_file_string,
        iconSize:     [80, 80],
        iconAnchor:   [27, 75],
        popupAnchor:  [0, -60]

    })    

    return modified_icon


}


function generateCarParkLayerDetachedFunction(car_park_layer, map, coordinate, car_park_statuses){
  

    car_park_layer.clearLayers()
    let marker_cluster = L.markerClusterGroup()
    for(let car_park_status of car_park_statuses){

        let car_park = car_park_status[0]
        let status = car_park_status[1]

        if(status){
                
            for (let i = 0;  i < status.carpark_info.length; i++){ // loops through the types of car park. some car parks have three types.
                
                display_status = {
                                    "available_lots":parseInt(status.carpark_info[i].lots_available), 
                                    "total_lots":parseInt(status.carpark_info[i].total_lots),
                                    "occupied_lots": parseInt(status.carpark_info[i].total_lots) - parseInt(status.carpark_info[i].lots_available),
                                    "percentage_lots":((status.carpark_info[i].total_lots-status.carpark_info[i].lots_available)/status.carpark_info[i].total_lots)*100,
                                    "last_updated":status.update_datetime,
                                    "lot_type":status.carpark_info[i].lot_type
                                    }
                    
                
                
                let coordinate_north=coordinate[0]+range
                let coordinate_south=coordinate[0]-range
                let coordinate_east=coordinate[1]+range
                let coordinate_west=coordinate[1]-range

                let lat_lng = svy21ToWgs84(car_park.y_coord, car_park.x_coord)//lat:lat_lng[0] lng:lat_lng[1]
            
                let flag = 0
                
                          
                if(lat_lng[0] >= coordinate_south && lat_lng[0] <= coordinate_north){
                    
                    flag = flag + 1
                }

               
                if(lat_lng[1] >= coordinate_west && lat_lng[1] <= coordinate_east){
                    flag = flag + 1
                }

                  
               
                if(flag === 2){
                    
                    let modified_icon = icon_selector(display_status["percentage_lots"], display_status["lot_type"])
                   
                    let marker = L.marker(lat_lng,{"icon":modified_icon})

                    marker.bindPopup(`<style></style><h3 id="carpark_number">${car_park.address}</h3> <p> Carpark Number: ${car_park.car_park_no} <br> Available Lots: ${display_status["available_lots"]} <br> Occupied Lots: ${display_status["occupied_lots"]} <br> Total Lots: ${display_status["total_lots"]} <br> Last updated: ${last_updated_duration(display_status["last_updated"])} <br> Car Park Type: ${display_status["lot_type"]}  <br> <button onclick="refresh()">Refresh</button> </p>`) //Check if refresh-btn attr should be class or id
                        

                    marker.addTo(marker_cluster)
                }
                    
            }
        }

      
       
    } 
    
    marker_cluster.addTo(car_park_layer)
        
    car_park_layer.addTo(map)
}