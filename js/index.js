async function start(){
    function init(){
      
        let map = createMap()
        let car_park_layer = L.layerGroup()
        let places_layer = L.layerGroup()
       
        window.addEventListener('DOMContentLoaded', async function(){
           
            let search_btn = document.querySelector('#search-btn')
            search_btn.addEventListener('click', async function(){
                 //foursquare layer  
                let user_input = document.querySelector("#search-input")
                let data = await searchLocations(map.getBounds().getCenter().lat, map.getBounds().getCenter().lng, user_input.value)
            
                addSearchResults(data, places_layer, car_park_layer, map)


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