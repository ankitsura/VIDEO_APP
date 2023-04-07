import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000/api/"});

API.interceptors.request.use((req) => {
    if(localStorage?.getItem('access_token')){
        req.headers.Authorization = `${localStorage.getItem('access_token')}`;
    }
    return req;
})

export const fetchVideos = (type) => API.get(`videos/${type}`);


//auth API
export const signIn = async (formData) => await API.post(`auth/signin`, formData);
export const signUp = async (formData) => await API.post(`auth/signup`, formData);
export const signInWithGoogle = async (formData) => {
   const res = await API.post(`auth/google`, formData);
   return res;
};

