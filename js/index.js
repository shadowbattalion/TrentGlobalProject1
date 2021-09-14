async function main(){
    function init(){// in JS init( can only exist in main()
      
        let map = initMap()//leaflet api, creates the map
        let car_park_layers = L.layerGroup()
        // let places_layer = L.layerGroup()
        // places_layer.addTo(map)
        window.addEventListener('DOMContentLoaded', async function(){
            //carParkLayer
            let car_park_list = await findCarPark()
            let car_park_status_list= await carParkStatus()
            generateCarParkLayer(car_park_list,car_park_status_list,car_park_layers)


        })

      
         
          
        }
      
        init();
      
    
      }
      
      

      
      main() //starting point