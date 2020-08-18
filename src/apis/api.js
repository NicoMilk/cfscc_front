import axios from "axios"

let baseApi=axios.create({
    // baseURL : "http://localhost:8000/api",
    baseURL : process.env.VUE_APP_URL_API,
})

let Api = function () {

    let token = localStorage.getItem("api_token");

    if (token) {
        baseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return baseApi;
}

export default Api;