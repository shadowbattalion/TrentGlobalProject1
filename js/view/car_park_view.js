let range = 0.0018018018 // 200 m calculations: https://www.nhc.noaa.gov/gccalc.shtml
let car_park_search_area = 300
let button_200 = document.querySelector("#change-radius-1")
let button_300 = document.querySelector("#change-radius-2")
let button_400 = document.querySelector("#change-radius-3")



function btn(page_no){

    
    let all_pages = document.querySelectorAll('.page')
    let all_nav_btns = document.querySelectorAll('.nav-link')
    
    for(let page  of all_pages){
      page.classList.remove('show')
      page.classList.add('hidden')
      page.classList.remove('active')  
    }

    for (let button of all_nav_btns){
        button.classList.remove('active')
    }
  
    document.querySelector(`#page-${page_no}`).classList.add('show')
    document.querySelector(`#btn-${page_no}`).classList.add('active')


}





function car_park_bindpopup_display_html_string(car_park, display_status){


    return `
    <style>
    #all-pages {
        position: relative;   
    
    }

    .page{

        height: auto;
        box-sizing: border-box;
        width:300px;
        height:200px;
        
      
    }


    .hidden{
        display:none;
    }
    
    
    
    .show{
        display:block;
    }
    

    .title{
        font-family: var(--font-family-main);
    
    }
    
    .body{
        font-family: var(--font-family-sub);
    
    }

    .line{
      
        background-image:linear-gradient(90deg,transparent, var(--primary-color),transparent);
        width:auto;
        height:2px;
  
    }

    .card{

        height: 100%; 
        width: 100%;

    }

    </style>
    
    <ul class="nav nav-pills">
        <li class="nav-item">
            <a onclick=btn(1) id="btn-1" class="nav-link active" href="#">Address</a>
        </li>
        <li class="nav-item">
            <a onclick=btn(2) id="btn-2" class="nav-link" href="#">Parking Details</a>
        </li>
        <li class="nav-item">
            <a onclick=btn(3) id="btn-3" class="nav-link" href="#">Physical Details</a>
        </li>
        <li class="nav-item">
            <a onclick=btn(4) id="btn-4" class="nav-link" href="#">Meta Details</a>
        </li>
    </ul>
    <div id="all-pages">
        <div id = "page-1" class="page">
            <div class="card mt-2">
                <div class="card-body">
                    <h5 class="title card-title">Car Park Address</h5>
                    <div class="line my-2"></div>
                    <h6 class="body" class="card-subtitle mb-2">
                        <p>
                            ${car_park.address}
                        </p>
                        <p>
                            Available Lots: ${display_status["available_lots"]}/${display_status["total_lots"]}
                        </p>
                        <p>
                            Last updated: ${last_updated_duration(display_status["last_updated"])} 
                        </p>    
                    </h6>
                </div>
            </div>
        </div>
        <div id = "page-2" class="page hidden">
            <div class="card mt-2">
                <div class="card-body">
                    <h5 class="title card-title">Car Park Parking Details</h5>
                    <div class="line my-2"></div>
                    <h6 class="body" class="card-subtitle mb-2">
                        <p> 
                            Short Term Parking: ${car_park.short_term_parking}
                        </p>
                        <p>
                            Free Parking: ${car_park.free_parking} 
                        </p>
                        <p>
                            Night Parking: ${car_park.night_parking}
                        </p>
                    </h6>
                </div>
            </div>       
        </div>
        <div id = "page-3" class="page hidden">
            <div class="card mt-2">
                <div class="card-body">
                    <h5 class="title card-title">Car Park Physical Details</h5>
                    <div class="line my-2"></div>
                    <h6 class="body" class="card-subtitle mb-2">
                        <p> 
                            Car Park Type: ${car_park.car_park_type}
                        </p>
                        <p>    
                            Car Park Decks: ${car_park.car_park_decks}
                        </p>
                        <p>    
                            Car Park Basement: ${car_park.car_park_basement}  
                        </p>
                    </h6>
                </div>
            </div>                  
        </div>
        <div id = "page-4" class="page hidden">
            <div class="card mt-2">
                <div class="card-body">
                    <h5 class="title card-title">Meta Details</h5>
                    <div class="line my-2"></div>
                    <h6 class="body" class="card-subtitle mb-2">
                        <p>
                            Carpark Number: ${car_park.car_park_no}
                        </p>
                        <p>
                            Gantry Height: ${car_park.gantry_height} "
                        </p>
                        <p>
                            Type Of Parking System: ${car_park.type_of_parking_system}
                        </p>    
                    </h6>
                </div>
            </div>
        </div>
    </div>
    `
    // 

}


function generateCarParkLayerDetachedFunction(car_park_layer, map, coordinate, car_park_statuses){
  
    car_park_layer.clearLayers()
    L.circle(coordinate,{radius:car_park_search_area,color:"#273b8a"}).addTo(car_park_layer)
    let marker_cluster = new L.MarkerClusterGroup()
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
                    

                    marker.bindPopup(car_park_bindpopup_display_html_string(car_park, display_status),{closeButton: false})
                    
                   
                    
                    
                    
                    marker.addTo(marker_cluster)
                        
                   
                    
                    


                }
                    
            }

        }

      
       
    } 
    
    
    marker_cluster.addTo(car_park_layer)    
    car_park_layer.addTo(map)
}




function generateCarParkLayer(car_park_list, car_park_status_list, car_park_layer, map, coordinate){
    
    
   

    let car_park_statuses = []

    for(let car_park of car_park_list.result.records){
        
        car_park_statuses.push([car_park,resolve_carpark_number(car_park_status_list, car_park.car_park_no)])

    } 
    
    

    generateCarParkLayerDetachedFunction(car_park_layer, map, coordinate, car_park_statuses)


    document.querySelector("#change-radius-1").addEventListener('click', function(){
        button_200.classList.add("disabled")
        button_300.classList.remove("disabled")
        button_400.classList.remove("disabled")

        range = parseFloat(button_200.value)
        car_park_search_area = 300

        generateCarParkLayerDetachedFunction(car_park_layer, map, coordinate, car_park_statuses)

        
    })

    document.querySelector("#change-radius-2").addEventListener('click', function(){
        button_200.classList.remove("disabled")
        button_300.classList.add("disabled")
        button_400.classList.remove("disabled")

        range = parseFloat(document.querySelector("#change-radius-2").value)
        car_park_search_area = 400

        generateCarParkLayerDetachedFunction(car_park_layer, map, coordinate, car_park_statuses)
        
       
    })

    document.querySelector("#change-radius-3").addEventListener('click', function(){
        button_200.classList.remove("disabled")
        button_300.classList.remove("disabled")
        button_400.classList.add("disabled")

        range = parseFloat(document.querySelector("#change-radius-3").value)
        car_park_search_area = 500

        generateCarParkLayerDetachedFunction(car_park_layer, map, coordinate, car_park_statuses)
        
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
        popupAnchor:  [-5, -70]

    })    

    return modified_icon


}


