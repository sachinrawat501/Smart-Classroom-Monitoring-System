import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-classroom-monitoring-system-qc7r.onrender.com/api",
});

export default API;