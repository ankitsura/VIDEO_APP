import { createError } from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const addVideo = async (req, res, next) => {
    const userId = req.user._id;
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
export const getAllVideos = async (req, res, next) => {
    try {
        const videos = await Video.find();
        if(!videos) return next(createError("Videos not found"));
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const updateVideo = async (req, res, next) => {
    const videoId = req.params.id;
    const userId = req.user._id;
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
    const userId = req.user._id;
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
    const userId = req.user._id;
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

export const getByTags = async (req, res, next) => {
    const tags = req.query.tags.split(',');
    try {
        const videos = await Video.find({tags: {$in : tags}}).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const search = async (req, res, next) => {
    const searchQuery = req.query.search;
    try {
        const videos = await Video.find({title: {$regex : searchQuery, $options: "i"}}).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
}

export const subscribed = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const subscribedChannels = user.subscribedUsers; // got all the channels subscribed by the user
        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
              return await Video.find({ userId: channelId });
            })
          );
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
        next(err);
    }
}

export const like = async (req, res, next) => {
    const id = req.user._id;
    const videoId = req.params.id;
    
    try {
        const video = await Video.findById(videoId);
        const isLiked = video.likes.findIndex((like) => like === id);
        const isDisliked = video.dislikes.findIndex((dislike) => dislike === id);
        if(isLiked === -1){
            // await Video.findByIdAndUpdate(videoId, {$push: {likes: id}});
            video.likes.push(req.user._id);
            await video.save();
            if(isDisliked !== -1){
                // await Video.findByIdAndUpdate(videoId, {$pull: {dislikes: id}});
                video.dislikes.pull(req.user._id);
                await video.save();
            }
            return res.status(200).json({
                video,
                message: "Video Liked"
            });
        }else{
            video.likes.pull(req.user._id);
            await video.save();
            return res.status(200).json({
                video,
                message: "Video Unliked"
            });
        }
    } catch (err) {
        next(err);
    }
}

export const dislike = async (req, res, next) => {
    const id = req.user._id;
    const videoId = req.params.id;
    try {
        const video = await Video.findById(videoId);
        const isLiked = video.likes.findIndex((like) => like === id);
        const isDisliked = video.dislikes.findIndex((dislike) => dislike === id);
        if(isDisliked === -1){
            // await Video.findByIdAndUpdate(videoId, {$push: {likes: id}});
            video.dislikes.push(req.user._id);
            await video.save();
            if(isLiked !== -1){
                // await Video.findByIdAndUpdate(videoId, {$pull: {dislikes: id}});
                video.likes.pull(req.user._id);
                await video.save();
            }
            return res.status(200).json({
                video,
                message: "Video Disliked"
            });
        }else{
            video.dislikes.pull(req.user._id);
            await video.save();
            return res.status(200).json({
                video,
                message: "Dislike Removed"
            });
        }
    } catch (err) {
        next(err);
    }
}