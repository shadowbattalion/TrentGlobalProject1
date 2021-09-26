async function main(){
    function init(){// in JS init( can only exist in main()
      
        let map = initMap()//leaflet api, creates the map
        let car_park_layer = L.layerGroup()
        let places_layer = L.layerGroup()
       
        window.addEventListener('DOMContentLoaded', async function(){
           
            document.querySelector('.search-btn').addEventListener('click', async function(){
                 //foursquare layer  
                let query = document.querySelector(".search-input").value
                let center = map.getBounds().getCenter()
                let data = await searchLocations(center.lat, center.lng, query)
            
                addSearchResults(data, places_layer, car_park_layer, map)





            })


            
            

        })

        let search_icon = document.querySelector("#search-icon")

        search_icon.addEventListener('click', function(){

            let banner = document.querySelector("#banner")
            banner.classList.add("hide-banner")
      
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



        })
         
          
        }
      
        init();
      
    
      }
      
      

      
      main() //starting point