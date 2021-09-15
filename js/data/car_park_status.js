async function carParkStatus(){

    let response = await axios.get("https://api.data.gov.sg/v1/transport/carpark-availability");

    return response.data

}





