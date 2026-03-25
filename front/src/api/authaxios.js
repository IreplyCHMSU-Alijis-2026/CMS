import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.68.117:3000",
  withCredentials: true
});