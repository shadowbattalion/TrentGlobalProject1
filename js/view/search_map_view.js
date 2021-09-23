let timer_id = 0

function stopCallingApi(){
  
  clearInterval(timer_id)

  }

async function addSearchResults(data, places_layer, car_park_layer, map){


    let car_park_list = await findCarPark()
  
    let search_result_element =  document.querySelector(".search-results")
    search_result_element.innerHTML = ""
  
    
  
    for(let each_venue of data.response.venues){
      let coordinate = [each_venue.location.lat, each_venue.location.lng]
      let marker = L.marker(coordinate)
      
  
  
      let result_element = document.createElement('div')
      result_element.innerHTML=`<div class="search-result" onClick="stopCallingApi()"><p class="para">${each_venue.name}</p><div class="line"></div></div>`
  
  
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
        marker.addTo(places_layer)
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
        
        
  
      })
  
  
  
      search_result_element.appendChild(result_element)
  
  
  
    }
  
    
  
  
   
    places_layer.addTo(map)
  
  
  
  
  }