import axios from "axios"

let accessToken = localStorage.getItem("token")

const api = axios.create({
baseURL:"http://localhost:3000",
withCredentials:true
})

api.interceptors.request.use((config)=>{

if(accessToken){

config.headers.Authorization=`Bearer ${accessToken}`

}

return config

})

api.interceptors.response.use(
res=>res,
async err=>{

const original = err.config

if(err.response.status===401 && !original._retry){

original._retry=true

const res = await axios.get("http://localhost:3000/refresh",{withCredentials:true})

accessToken = res.data.accessToken

localStorage.setItem("token",accessToken)

original.headers.Authorization=`Bearer ${accessToken}`

return axios(original)

}

return Promise.reject(err)

}
)

export default api