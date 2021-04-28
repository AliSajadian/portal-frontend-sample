import axios from "axios";

let token = sessionStorage.getItem("token");
let config = {
    "Authorization" : ""
};
if (token) {
    config["Authorization"] = `Token ${token}`;
}


const instance = axios.create({
    baseURL : "http://172.20.20.45:90/api/",
    headers : config
}) 


export default instance;