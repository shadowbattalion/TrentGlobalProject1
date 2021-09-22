let search_icon = document.querySelector("#search-icon")

search_icon.addEventListener('click', function(){

    let search_group = document.querySelector(".search-group")
    search_group.classList.toggle("search-group-expand")
    let search_button =  document.querySelector(".search-btn")
    search_button.classList.toggle("search-btn-expand")
    let search_input =  document.querySelector(".search-input")
    search_input.classList.toggle("search-input-expand")
  



})