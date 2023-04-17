import axios from 'axios';
import { subscriptions } from '../redux/userSlice';
import { fetchSuccess, handleSubscribersCount } from '../redux/videoSlice';

const API = axios.create({baseURL: "http://localhost:5000/api/"});

API.interceptors.request.use((req) => {
    if(localStorage?.getItem('access_token')){
        const token = JSON.parse(localStorage.getItem('access_token')).token;
        req.headers.Authorization = token;
    }
    return req;
})

export const uploadVideo = (videoData) => (API.post(`videos`, videoData).data);
export const fetchVideos = (type) => API.get(`videos/${type}`);
export const fetchSearchVideos = (searchQuery) => API.get(`videos/search?searchQuery=${searchQuery}`);
export const fetchVideosByTags = (tags) => API.get(`videos/tags?tags=${tags}`);
export const fetchComments = (videoId) => API.get(`comments/${videoId}`);
export const getUser = (userId) => API.get(`users/find/${userId}`);

export const getSingleVideo = (id) => async (dispatch) => {
   const video = (await API.get(`videos/find/${id}`)).data;
   const channel = (await API.get(`users/find/${video.userId}`)).data;
   dispatch(fetchSuccess({video, channel}));
}

export const likeVideo = (id) => API.patch(`videos/like/${id}`);
export const dislikeVideo = (id) => API.patch(`videos/dislike/${id}`);


export const handleSubscribeChannel = (channelId) => async (dispatch) => {
    const channel =  (await API.put(`users/sub/${channelId}`)).data.resChannel;
    await dispatch(subscriptions(channel));
    dispatch(handleSubscribersCount(channel));
}

//auth API
export const signIn = async (formData) => await API.post(`auth/signin`, formData);
export const signUp = async (formData) => await API.post(`auth/signup`, formData);
export const signInWithGoogle = async (formData) => {
   const res = await API.post(`auth/google`, formData);
   return res;
};

