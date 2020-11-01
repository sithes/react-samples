import axios from "axios";

const API_URL = "http://localhost:8080/api/mstracker/";

const register = (msName, isProfReq, isPtRequired) => {
  return axios.post(API_URL + "register", {
    msName,
    isProfReq,
    isPtRequired
  });
};

export default {
  register 
};
