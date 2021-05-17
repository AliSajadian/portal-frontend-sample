import axios from "axios";

let token = sessionStorage.getItem("token");
let config = {
    "Authorization" : ""
};
if (token) {
    config["Authorization"] = `Token ${token}`;
}


const instance = axios.create({
    baseURL : "http://127.0.0.1:8000/api/",
    headers : config
}) 


export default instance;