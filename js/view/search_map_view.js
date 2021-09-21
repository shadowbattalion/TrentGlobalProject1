let timer_id = 0

function stopCallingApi(){
  
  clearInterval(timer_id)

  }

async function addSearchResults(data, places_layer, car_park_layer, map){


    let car_park_list = await findCarPark()
  
    let search_result_element =  document.querySelector("#search-results")
    search_result_element.innerHTML = ""
  
    
  
    for(let each_venue of data.response.venues){
      let coordinate = [each_venue.location.lat, each_venue.location.lng]
      let marker = L.marker(coordinate)
      
  
  
      let result_element = document.createElement('div')
      result_element.className="search-result"
      result_element.onclick = stopCallingApi()
      result_element.innerHTML=each_venue.name
  
  
      result_element.addEventListener("click", async function(){
        
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