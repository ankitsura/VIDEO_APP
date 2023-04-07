import { createError } from "../error.js";
import Comment from "../models/Comments.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
    const newComment = {...req.body, userId: req.user._id};
    try {
        const comment = await Comment.create(newComment);
        res.status(200).json({
            comment,
            message: 'Comment Created'
        });
    } catch (err) {
        next(err);
    }
}

export const getComments = async (req, res, next) => {
    const videoId = req.params.videoId;
    try {
        const comments = await Comment.find({videoId: videoId});
        if(!comments) return next(createError(404, "No comments to display"));
        res.status(200).json(comments);
    } catch (err) {
        next(err);
    }
}


export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);
        const video = await Video.findById(req.params.videoId);
        if(req.user._id === comment.userId || req.user._id === video.userId){
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json("The Comment has been Deleted");
        }else{
            return next(createError(403, "You can not delete this comment"));
        }
    } catch (err) {
        next(err);
    }
}

// export const updateComment = async (req, res, next) => {
//     const comment = req.body;
//     const userId = req.user._id;
//     try {
//         const comment = await Comment.create();
//         if(!users) return next(createError(404, "No user to display"));
//         res.status(200).json(users);
//     } catch (err) {
//         next(err);
//     }
// }