import axios from "axios";

//Base da API: https://api.openweathermap.org/data/2.5/weather
//API Key: a38657a566695e3d288c8bad2a16b91c

const api = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
});

export default api;