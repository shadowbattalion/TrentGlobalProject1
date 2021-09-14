async function findCarPark(){

    

    let response_json = await axios.get("https://data.gov.sg/api/action/datastore_search",{params:{"resource_id":"139a3035-e624-4f56-b63f-89ae28d4ae4c","limit":"2170"}})
    return response_json.data
     
}