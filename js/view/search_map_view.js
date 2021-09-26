
//This is the function to stop all time interval of function. 
//This is important as some data still remained in the system after 
//the user clicks on one of the search results which will restart the function which retrieves the car park status
let timer_id = 0

function stopCallingApi(){
  
  clearInterval(timer_id)

}


//This is the function to process the innerHTML of the search result display which will be formatted with an on-board css script
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
function icon(coordinate, custom_icon){

  let places_icon = L.icon({
    iconUrl: custom_icon,
    iconSize: [64, 64],
    iconAnchor: [35, 50],
    popupAnchor: [0, -50]
  });
   
  return L.marker(coordinate,{icon:places_icon})

}


//This is the main function which will start from retrieving the search results of the location, 
//to the car park places to 
//getting the car park's status
async function addSearchResults(data, places_layer, car_park_layer, map){


    let car_park_list = await findCarPark()
  
    let search_result_element =  document.querySelector("#search-results")
    search_result_element.innerHTML = ""
  
    
  
    for(let each_venue of data.response.venues){
      let coordinate = [each_venue.location.lat, each_venue.location.lng]
      

  
  
      let result_element = document.createElement('div')
      result_element.innerHTML = search_result_display_html_string(each_venue)  
      
      search_result_element.appendChild(result_element)


      result_element.addEventListener("click", async function(){
        
        let custom_icon = each_venue.categories[0]?`${each_venue.categories[0].icon.prefix}bg_64${each_venue.categories[0].icon.suffix}`:"" // remember to add size
        let marker = ""

        if(custom_icon){
          console.log(custom_icon)
          marker = icon(coordinate, custom_icon) 
        }else{
          marker = L.marker(coordinate)
        }


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
      
      
      
        
        places_layer.clearLayers()
        marker.bindPopup(location_bindpopup_display_html_string(each_venue),{closeButton: false})
        map.flyTo(coordinate, 18)
        marker.addTo(places_layer)
        marker.openPopup()
       
       
        //carParkLayer
        
        let car_park_status_list= await carParkStatus()
        console.log(coordinate)
        stopCallingApi()
        
        generateCarParkLayer(car_park_list, car_park_status_list, car_park_layer, map, coordinate, false)
        
        timer_id = setInterval(async function(){
                                  let car_park_status_list= await carParkStatus()
                                  console.log(coordinate)
                                  generateCarParkLayer(car_park_list, car_park_status_list, car_park_layer, map, coordinate, true)
                        
                                  }, 120000)
        
        
        
  
      })
  
     
  
      
      
  
  
  
    }
  
    
  
  
   
    places_layer.addTo(map)
  
  
  
  
  }

  