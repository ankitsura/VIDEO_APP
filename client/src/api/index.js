import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000/api/"});

API.interceptors.request.use((req) => {
    if(localStorage?.getItem('access_token')){
        const token = JSON.parse(localStorage.getItem('access_token')).token;
        req.headers.Authorization = token;
    }
    return req;
})

export const fetchVideos = (type) => API.get(`videos/${type}`);
export const getSingleVideo = (id) => API.get(`videos/find/${id}`);
export const likeVideo = (id) => API.patch(`videos/like/${id}`);
export const dislikeVideo = (id) => API.patch(`videos/dislike/${id}`);

export const getChannel = (userId) => API.get(`users/find/${userId}`);


//auth API
export const signIn = async (formData) => await API.post(`auth/signin`, formData);
export const signUp = async (formData) => await API.post(`auth/signup`, formData);
export const signInWithGoogle = async (formData) => {
   const res = await API.post(`auth/google`, formData);
   return res;
};

