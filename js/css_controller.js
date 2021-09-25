let search_icon = document.querySelector("#search-icon")

search_icon.addEventListener('click', function(){

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


// document.querySelector("#btn-1").addEventListener('click', function(){
//     console.log("test")
    // let allPages = document.querySelectorAll('.page')
    // for(let p  of allPages){
    //   p.classList.remove('show')
    //   p.classList.add('hidden')
  
    // }
  
    // document.querySelector('#page-1').classList.add('show')
//   })
  
  
//   document.querySelector("#btn-2").addEventListener('click', function(){
  
//     let allPages = document.querySelectorAll('.page')
//     for(let p  of allPages){
//       p.classList.remove('show')
//       p.classList.add('hidden')
  
//     }
  
//     document.querySelector('#page-2').classList.add('show')
//   })
  
  
//   document.querySelector("#btn-3").addEventListener('click', function(){
  
//     let allPages = document.querySelectorAll('.page')
//     for(let p  of allPages){
//       p.classList.remove('show')
//       p.classList.add('hidden')
  
//     }
  
//     document.querySelector('#page-3').classList.add('show')
//   })