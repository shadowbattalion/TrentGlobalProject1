let timer_id = 0




function stopCallingApi(){
  
  clearInterval(timer_id)

}


function search_result_display_html_string(each_venue){

    
    let venue_name = each_venue.name?each_venue.name:""
    let address = each_venue.location.address?each_venue.location.address:""
    // let location = 

    return `
    <style>
      .search-result p{

        font-family: var(--font-family);
        margin:30px;
    
  
      }
  
      .search-result p a{
  
        text-decoration:none;
        color:black;
  
      }

      .location-name-link{

        font-size:15px;

      }

  
      .search-result .line{
      
          background-image:linear-gradient(90deg,transparent, var(--primary-color),transparent);
          width:auto;
          height:1px;
        
      
      }
            
      </style>
      <div class="search-result" onClick="stopCallingApi()">
        <p>
          <a class="location-name-link" href="#">${venue_name}</a>  
        </p>
        <p>
          <a class="address-link" href="#">${address}</a>    
        </p>
        <p>
          <a class="description-link" href="#">${address}</a>    
        </p>

        <div class="line"></div>
      </div>`
}



async function addSearchResults(data, places_layer, car_park_layer, map){


    let car_park_list = await findCarPark()
  
    let search_result_element =  document.querySelector(".search-results")
    search_result_element.innerHTML = ""
  
    
  
    for(let each_venue of data.response.venues){
      let coordinate = [each_venue.location.lat, each_venue.location.lng]
      let marker = L.marker(coordinate)
      
  
  
      let result_element = document.createElement('div')
      result_element.innerHTML = search_result_display_html_string(each_venue)  
  


     

      result_element.addEventListener("click", async function(){

        
        //search bar animation
        let search_group = document.querySelector(".search-group")
        search_group.classList.toggle("search-group-expand")
        let search_button =  document.querySelector(".search-btn")
        search_button.classList.toggle("search-btn-expand")
        let search_input =  document.querySelector(".search-input")
        search_input.classList.toggle("search-input-expand")
        let search_results =  document.querySelector(".search-results")
        search_results.classList.toggle("search-results-expand")
        let search_container =  document.querySelector(".search-container")
        search_container.classList.toggle("search-container-expand")
        //search bar animation
      
      
      
        
        places_layer.clearLayers()
        marker.bindPopup(`<div><h1>${each_venue.name}</h1></div> `)
        map.flyTo(coordinate, 18)
        marker.openPopup()
       
       
        //carParkLayer
        
        let car_park_status_list= await carParkStatus()
        console.log(coordinate)
        stopCallingApi()
        generateCarParkLayer(car_park_list, car_park_status_list, car_park_layer, map, coordinate)
        
        timer_id = setInterval(async function(){
                                  let car_park_status_list= await carParkStatus()
                                  console.log(coordinate)
                                  generateCarParkLayer(car_park_list, car_park_status_list, car_park_layer, map, coordinate)
                        
                                  }, 20000)
        
        marker.addTo(places_layer)
        
  
      })
  
  
      
      search_result_element.appendChild(result_element)
  
  
  
    }
  
    
  
  
   
    places_layer.addTo(map)
  
  
  
  
  }

  