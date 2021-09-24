let timer_id = 0




function stopCallingApi(){
  
  clearInterval(timer_id)

}


function search_result_display_html_string(each_venue){

    
    let venue_name = each_venue.name?each_venue.name:""
    let address = each_venue.location.formattedAddress?each_venue.location.formattedAddress:""
    let descriptions = each_venue.categories?each_venue.categories:""
    let location_description=[]
    for(let description of descriptions){

      location_description.push(description.name)

    }

    return `
    <style>
      .search-result p{

        font-family: var(--font-family);
        margin:10px;
    
  
      }
  
      .search-result p a{
  
        text-decoration:none;
        color:black;
  
      }

      .location-name-link{

        font-size:17px;

      }

      .address-link{

        font-size:15px;

      }

      .description-link{

        font-size:12px;

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
          <a class="address-link" href="#">${address.join(" ")}</a>    
        </p>
        <p>
          <a class="description-link" href="#">${location_description.join(" ")}</a>    
        </p>

        <div class="line"></div>
      </div>`
}

function location_bindpopup_display_html_string(each_venue){

  let venue_name = each_venue.name?each_venue.name:""
  let address = each_venue.location.formattedAddress?each_venue.location.formattedAddress:""
  let descriptions = each_venue.categories?each_venue.categories:""
  let location_description=[]
  for(let description of descriptions){

    location_description.push(description.name)

  }

  return `
  <style>
  </style>
  <div class="card" style="width: auto;">
    <div class="card-body">
      <h5 class="card-title">${venue_name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${address}</h6>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>
  
  `





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
        marker.bindPopup(location_bindpopup_display_html_string(each_venue),{closeButton: false})
        map.flyTo(coordinate, 18)
        marker.addTo(places_layer)
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
        
        
        
  
      })
  
  
      
      search_result_element.appendChild(result_element)
  
  
  
    }
  
    
  
  
   
    places_layer.addTo(map)
  
  
  
  
  }

  