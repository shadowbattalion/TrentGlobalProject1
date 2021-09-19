function addSearchResults(data, places_layer, map){


    
  
    let search_result_element =  document.querySelector("#search-results")
    search_result_element.innerHTML = ""
  
    
  
    for(let each_venue of data.response.venues){
      let coordinate = [each_venue.location.lat, each_venue.location.lng]
      let marker = L.marker(coordinate)
      
  
  
      let result_element = document.createElement('div')
      result_element.className="search-result"
      result_element.innerHTML=each_venue.name
  
  
      result_element.addEventListener("click", async function(){
        
        places_layer.clearLayers()
        marker.bindPopup(`<div><h1>${each_venue.name}</h1></div> `)
        marker.addTo(places_layer)
        map.flyTo(coordinate, 18)
        marker.openPopup()
        setTimeout(async function(){ 
          let bounds = map.getBounds()
          let southWest = bounds.getSouthWest()
          let northEast = bounds.getNorthEast()
          console.log(southWest,northEast)
        }, 3000)
       
        
  
      })
  
  
  
      search_result_element.appendChild(result_element)
  
  
  
    }
  
    
  
  
   
    places_layer.addTo(map)
  
  
  
  
  }