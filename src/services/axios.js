import axios from "axios";

let token = sessionStorage.getItem("token");
let config = {
    "Authorization" : ""
};
if (token) {
    config["Authorization"] = `Token ${token}`;
}


const instance = axios.create({
    baseURL : "http://portalapi.asft.co/api/",
    headers : config
}) 


export default instance;