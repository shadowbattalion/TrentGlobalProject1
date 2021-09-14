async function carParkStatus(){

    let response = await axios.get("https://api.data.gov.sg/v1/transport/carpark-availability");

    return response.data

}


function resolve_carpark_number(car_park_status_list, car_park_no){
    
    let chosen_carpak_status={}

    for (let status of car_park_status_list.items[0].carpark_data){
        
        // console.log(status)
        if(status.car_park_no === car_park_no){
            chosen_carpak_status = status
            break
        } else {

            chosen_carpak_status = null

        }
        
    }

    return chosen_carpak_status
}



function percentage_to_icon(percentage){

    let icon = ""

    if(percentage === null){

        icon="images/full_null.png"

    } else {

        if(percentage===100){

            icon="images/full_100.png"

        }else if(percentage >= 90 && percentage < 100){

            icon="images/full_90.png"

        }else if(percentage >= 80 && percentage < 90){

            icon="images/full_80.png"
            
        }else if(percentage >= 70 && percentage < 80){

            icon="images/full_70.png"
            
        }else if(percentage >= 60 && percentage < 70){

            icon="images/full_60.png"
            
        }else if(percentage >= 50 && percentage < 60){

            icon="images/full_50.png"
            
        }else if(percentage >= 40 && percentage < 50){

            icon="images/full_40.png"
            
        }else if(percentage >= 30 && percentage < 40){

            icon="images/full_30.png"
            
        }else if(percentage >= 20 && percentage < 30){

            icon="images/full_20.png"
            
        }else if(percentage >= 10 && percentage < 20){

            icon="images/full_10.png"
            
        }else if(percentage >= 0 && percentage < 10){

            icon="images/full_0.png"
            
        }

    }

    return icon


}