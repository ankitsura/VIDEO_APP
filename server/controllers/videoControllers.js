import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const newVideo = await Video.create({userId, ...req.body});
        res.status(200).json(newVideo);
    } catch (err) {
        next(err);
    }
}

export const getVideo = async (req, res, next) => {
    const videoId = req.params.id;
    try {
        const video = await Video.findById(videoId);
        if(!video) return next(createError("Video not found"));
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
}

export const updateVideo = async (req, res, next) => {
    const videoId = req.params.id;
    const userId = req.user.id;
    try {
        const video = await Video.findById(videoId);
        if(!video) return next(createError("Video not found"));
        if(videoId === userId){
            const updatedVideo = await Video.findByIdAndUpdate(videoId, { $set: req.body}, {new: true});
            res.status(200).json(updatedVideo);
        }else{
            return next(createError(403, 'Unauthorized'));
        }
    } catch (err) {
        next(err);
    }
}

export const deleteVideo = async (req, res, next) => {
    const videoId = req.params.id;
    const userId = req.user.id;
    try {
        const video = await Video.findById(videoId);
        if(!video) return next(createError("Video not found"));
        if(videoId === userId){
            await Video.findByIdAndDelete(videoId);
            res.status(200).json('Video has been Deleted!');
        }else{
            return next(createError(403, 'Unauthorized'));
        }

    } catch (err) {
        next(err);
    }
}

export const addView = async (req, res, next) => {
    const videoId = req.params.id;
    const userId = req.user.id;
    try {
        const addedView = await Video.findByIdAndUpdate(videoId, { $inc: {views: 1}});
        res.status(200).json('View Added');
    } catch (err) {
        next(err);
    }
}

export const random = async (req, res, next) => {
    try {
        const randoms = await Video.aggregate([{ $sample: {size: 40}}]);
        res.status(200).json(randoms)
    } catch (err) {
        next(err);
    }
}

export const trend = async (req, res, next) => {
    try {
        const trends = await Video.find().sort({views: -1});
        res.status(200).json(trends);
    } catch (err) {
        next(err);
    }
}

export const subscribed = async (req, res, next) => {
    const videoId = req.params.id;
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);
        const subscribedChannels = user.subscribedUsers; // got all the channels subscribed by the user

        const list =  await Promise.all(subscribedChannels.map((channelId) => {
            return Video.find({userId: channelId}).exec();
        }));

        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}