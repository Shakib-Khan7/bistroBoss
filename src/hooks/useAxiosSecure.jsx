import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logOut} = useAuth()
    //request interceptor to add authrization header for every secure call to api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
       
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    //intercept 401 and 403 status

    axiosSecure.interceptors.response.use((response)=>{
        return response
    },async(error)=>{
        const status = error.response.status;
       
        if(status === 401 || status === 403){
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })







    return axiosSecure
};

export default useAxiosSecure;