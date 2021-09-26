
//This is the function to stop all time interval of function. 
//This is important as some data still remained in the system after 
//the user clicks on one of the search results which will restart the function which retrieves the car park status
let timer_id = 0

function stopCallingApi(){
  
  clearInterval(timer_id)

}


//This is the function to process the innerHTML of the search result display which will be formatted with an on-board css script
function search_result_display_html_string(venue){

    
    let venue_name = venue.name?venue.name:""
    let address = venue.location.formattedAddress?venue.location.formattedAddress:""
    let descriptions = venue.categories?venue.categories:""
    let location_description=[]
    for(let description of descriptions){

      location_description.push(description.name)

    }

    return `
    <style>
      .search-result p{

        font-family: var(--font-family-main);
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

  
      .line{
      
          background-image:linear-gradient(90deg,transparent, var(--primary-color),transparent);
          width:auto;
          height:2px;
    
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



//This is the function that processes the html string for the bind popup which also has its own on-board css script
function location_bindpopup_display_html_string(venue){

  let venue_name = venue.name?venue.name:""
  let address = venue.location.formattedAddress?venue.location.formattedAddress:""
  let descriptions = venue.categories?venue.categories:""
  let location_description=[]
  for(let description of descriptions){

    location_description.push(description.name)

  }

  return `
  <style>
  .title{
    font-family: var(--font-family-main);

  }

  .body{
    font-family: var(--font-family-sub);

  }
  
  </style>
  <div class="card" style="width: auto;">
    <div class="card-body">
      <h5 class="title card-title">${venue_name}</h5>
      <div class="line my-2"></div>
      <h6 class="body" class="card-subtitle mb-2">${address.join(" ")}</h6>
      <p class="body" class="card-text">${location_description.join(" ")}</p>
    </div>
  </div> `
}


//This is a function which will customise the icons for the searched location, like school, library, etc
function icon(coords, custom_icon){

  let places_icon = L.icon({
    iconUrl: custom_icon,
    iconSize: [64, 64],
    iconAnchor: [35, 50],
    popupAnchor: [0, -50]
  });
   
  return L.marker(coords,{icon:places_icon})

}


//This is the main function which will start from retrieving the search results of the places locations, 
//to retrieving car park locations to 
//getting the car park's status
async function displayResult(location_data, places_layer, car_park_layer, map){


    let car_park_list = await findCarPark()
  
    let search_results_panel=  document.querySelector("#search-results")
    search_results_panel.innerHTML = ""
  
    
  
    for(let venue of location_data.response.venues){
      let coords = [venue.location.lat, venue.location.lng]
      

  
      //Adds to the search result panel in HTML DOM
      let result_item = document.createElement('div')
      result_item.innerHTML = search_result_display_html_string(venue)  
      
      search_results_panel.appendChild(result_item)

      //Each search result of the location retrieved will be armed with an event listener 
      result_item.addEventListener("click", async function(){
        
        let custom_icon = venue.categories[0]?`${venue.categories[0].icon.prefix}bg_64${venue.categories[0].icon.suffix}`:"" // remember to add size
        let marker = ""

        if(custom_icon){
          marker = icon(coords, custom_icon) 
        }else{
          marker = L.marker(coords)
        }

        // The search bar and the search result panel will disappear once the use clicks on one of the search results
        //search bar animation
        let search_group = document.querySelector("#search-group")
        search_group.classList.toggle("search-group-expand")
        let search_button =  document.querySelector("#search-btn")
        search_button.classList.toggle("search-btn-expand")
        let search_input =  document.querySelector("#search-input")
        search_input.classList.toggle("search-input-expand")
        let search_results =  document.querySelector("#search-results")
        search_results.classList.toggle("search-results-expand")
        let search_container =  document.querySelector("#search-container")
        search_container.classList.toggle("search-container-expand")
        //search bar animation
      
      
      
        //adds the chosen location marker to the places_layer, along with its popup. The screen will fly to the said location
        places_layer.clearLayers()
        marker.bindPopup(location_bindpopup_display_html_string(venue),{closeButton: false})
        map.flyTo(coords, 18)
        marker.addTo(places_layer)
        marker.openPopup()
       
       
        //Once the location has been chose, the coordinates of the location will be used to find all the car park within the radius
        //which can be set by the user.
        
        //Car park location details will be retreived from the API once as it contains static values
        let car_park_status_list= await carParkStatus()
        console.log(coords)
        stopCallingApi()
        
        //This funciton will process the car_park marker and will print the icons on the map
        generateCarParkLayer(car_park_list, car_park_status_list, car_park_layer, map, coords, false)
        
        // This function will continue to call the function in an interval, so that the status of the car park, in terms of the number of
        // available slots will be updated after every two minutes
        timer_id = setInterval(async function(){
                                  let car_park_status_list= await carParkStatus()
                                  console.log(coords)
                                  generateCarParkLayer(car_park_list, car_park_status_list, car_park_layer, map, coords, true)
                        
                                  }, 120000)
        
        
        
  
      })
  
     
  
      
      
  
  
  
    }
  
    
  
  
    //places_layer will be added to map
    places_layer.addTo(map)
  
  
  
  
  }

  