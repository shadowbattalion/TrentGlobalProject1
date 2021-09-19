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
            
                addSearchResults(data, places_layer, map)



                //carParkLayer
                let car_park_list = await findCarPark()
                let car_park_status_list= await carParkStatus()
                generateCarParkLayer(car_park_list, car_park_status_list, car_park_layer, map)
                let i=0
                setInterval(async function(){
                    console.log(i)
                    i++
                    let car_park_status_list= await carParkStatus()
                    generateCarParkLayer(car_park_list, car_park_status_list, car_park_layer, map)}, 60000)




            })


            
            

        })

      
         
          
        }
      
        init();
      
    
      }
      
      

      
      main() //starting point