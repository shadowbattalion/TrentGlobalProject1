const API_URL  = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability";
const ACCESS_KEY = "ba7496cc-50bc-467a-84e9-ef554baa0887";
const TOKEN = "7b85bG7e7g-SvbbqZvTTM6Dq5+VHHJ76z5C7wata7a6zKbAA98bUc-vc0q8a4-RaaKn4rr86aVafK-HRcRfv7a44bafBR-a697-b"

const PROXY =  "https://project1-proxy-server.herokuapp.com/request-api"

let param  = {
    "api_url": API_URL,
    "access_key": ACCESS_KEY,
    "token": TOKEN
    }

async function loadData(){
    let response = await axios.post(PROXY, param)
    // let response = await axios.get("https://project1-proxy-server.herokuapp.com/test")
    // console.log(response.data)
    return response.data  
    }
       
// console.log(loadData())
// loadData()