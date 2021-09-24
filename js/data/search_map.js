async function searchLocations(lat, lng, query) {
    const API_BASE_URL =  "https://api.foursquare.com/v2"
    const CLIENT_ID= "F05BDJVUQTTIDVHVYMEH1XN25GZWC4BAPFU4WD5EFOKHTUGA"
    const CLIENT_SECRET= "TBSGKKHPUTFKBH02IKMJNGULPCWQRRDP1NUXRILWPBIHWNUU"
    const VERSION = "20210919"

    let ll = `${lat},${lng}`;
    let response = await axios.get(API_BASE_URL+'/venues/search', {
        params: {
            'll': ll,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'v': VERSION,
            'query': query
        }
    })
    console.log(response.data)
    return response.data;
}