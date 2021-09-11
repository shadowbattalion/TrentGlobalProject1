const API_URL  = "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability";
const ACCESS_KEY = "ba7496cc-50bc-467a-84e9-ef554baa0887";
const TOKEN = "5Sy9Nbzm-c-0+3UuPMXa987NaB88S5W5-7Z9j6F5-9b7QZg8wcae0cNcGgkxP7ae4a5-58bG6csbecP44-Ws9U-5bkH2yxQwAtT-"

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