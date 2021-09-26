async function start(){
    function init(){
      
        let map = createMap()
        let car_park_layer = L.layerGroup() // will be populated by markers with lat and lng taken from data.gov.sg API
        let places_layer = L.layerGroup() // will be populated by markers with lat and lng taken from foursquare API
       
        window.addEventListener('DOMContentLoaded', async function(){
           
            let search_btn = document.querySelector('#search-btn')
            search_btn.addEventListener('click', async function(){
                
                // Search location using foursquare api and user query  
                let user_input = document.querySelector("#search-input")
                let location_data = await searchLocations(map.getBounds().getCenter().lat, map.getBounds().getCenter().lng, user_input.value)
                
                //This function will layout all the selected location marker and the car park marker
                displayResult(location_data, places_layer, car_park_layer, map)


            })


        })

        let search_icon = document.querySelector("#search-icon")

        search_icon.addEventListener('click', function(){

            let banner = document.querySelector("#banner")
            banner.classList.add("hide-banner")
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



        })
         
          
        }
      
        init()
      
    
      }
      
      

      
      start() 