import axios from "axios";

const instance = axios.create({

  baseURL: "https://656d-106-222-215-238.ngrok-free.app/api",
  
  withCredentials:true,
});

export default instance;
