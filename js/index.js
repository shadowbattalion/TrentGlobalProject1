async function main(){
    function init(){// in JS init( can only exist in main()
      
        let map = initMap()//leaflet api, creates the map
        let c_car_park_layer = L.layerGroup()
        let y_car_park_layer = L.layerGroup()
        let h_car_park_layer = L.layerGroup()
        let main_car_park_layer = L.layerGroup()
        // let places_layer = L.layerGroup()
        // places_layer.addTo(map)
        let layers = [c_car_park_layer, y_car_park_layer, h_car_park_layer, main_car_park_layer]
        window.addEventListener('DOMContentLoaded', async function(){
            //carParkLayer
            let car_park_list = await findCarPark()
            let car_park_status_list= await carParkStatus()
            generateCarParkLayer(car_park_list,car_park_status_list,layers, map)
            

        })

      
         
          
        }
      
        init();
      
    
      }
      
      

      
      main() //starting point