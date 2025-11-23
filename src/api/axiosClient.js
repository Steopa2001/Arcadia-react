import axios from  "axios";

// Legge l'indirizzo del backend dall'ambiente (.env o Railway)
const API = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});    

export default axiosClient;
