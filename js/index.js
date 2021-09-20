async function main(){
    function init(){// in JS init( can only exist in main()
      
        let map = initMap()//leaflet api, creates the map
        let car_park_layer = L.layerGroup()
        let places_layer = L.layerGroup()
        // places_layer.addTo(map)
        window.addEventListener('DOMContentLoaded', async function(){
           
            document.querySelector('#search-btn').addEventListener('click', async function(){
                 //foursquare layer  
                let query = document.querySelector("#search-input").value
                let center = map.getBounds().getCenter()
                let data = await searchLocations(center.lat, center.lng, query)
            
                addSearchResults(data, places_layer, car_park_layer, map)





            })


            
            

        })

      
         
          
        }
      
        init();
      
    
      }
      
      

      
      main() //starting point