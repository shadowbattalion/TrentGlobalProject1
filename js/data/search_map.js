async function searchLocations(lat, lng, query) {
    const API_BASE_URL =  "https://api.foursquare.com/v2"
    const CLIENT_ID= "F05BDJVUQTTIDVHVYMEH1XN25GZWC4BAPFU4WD5EFOKHTUGA"
    const CLIENT_SECRET= "TBSGKKHPUTFKBH02IKMJNGULPCWQRRDP1NUXRILWPBIHWNUU"
    const VERSION = "20210928"
    let lat_lng_ll = `${lat},${lng}`

    let parameters= {
        'll': lat_lng_ll,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'v': VERSION,
        'query': query
    }

    let location = await axios.get(API_BASE_URL+'/venues/search', {params:parameters})

    return location.data
}