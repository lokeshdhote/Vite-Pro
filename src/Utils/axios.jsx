import axios from "axios";

const instance = axios.create({

  baseURL: "https://3e69-106-222-215-33.ngrok-free.app/api/user/",
 
  withCredentials:true,
});

export default instance;
