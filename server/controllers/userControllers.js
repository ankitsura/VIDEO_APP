import { createError } from "../error.js";
import User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if(!users) return next(createError(404, "No user to display"));
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

export const update = async (req, res, next) => {
    const id = req.params.id;
    if(req.user.id === id){
        try {
            const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    }else{
        return next(createError(403, "You can not update this"));
    }
}

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    if(req.user.id === id){
        try {
            await User.findByIdAndDelete(id);
            res.status(200).json("User has been deleted");
        } catch (err) {
            next(err);
        }
    }else{
        return next(createError(403, "You can not update this"));
    }
}

export const getUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if(!user) return next(createError(404, 'User does not exist'));
        const {password, ...others} =  user._doc;
        res.status(200).json(others);
    } catch (err) {
        next(err);
    }
}

export const subscribe = async (req, res, next) => {
    const channelsUserId = req.params.id;
    try {
        const user = await User.findById(req.user.id);
        const subscribedUsers = user.subscribedUsers;
        const isSubscribed = subscribedUsers.filter((subscriber) => subscriber === req.params.id);
        if(!isSubscribed){
            await User.findByIdAndUpdate(req.user.id, {$push: {subscribedUsers: channelsUserId}});
            await User.findByIdAndUpdate(channelsUserId, { $inc: {subscribers: 1}})
            res.status(200).json('Subscribed to this channel');
        }
        res.status(400).json('Yoy are already Subscribed to this Channel');

    } catch (err) {
        next(err);
    }
}

export const unsubscribe = async (req, res, next) => {
    const channelsUserId = req.parsms.id;
    try {
        await User.findById(req.user.id, {$pull: {subscribedUsers: channelsUserId}});
        await User.findByIdAndUpdate(channelsUserId, { $inc: {subscribers: -1}})

        res.status(200).json('Unsubscribed to this channel');
    } catch (err) {
        next(err);
    }
}

export const like = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
}

export const dislike = async (req, res, next) => {
    try {
        
    } catch (err) {
        next(err);
    }
}
