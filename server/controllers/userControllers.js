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
    if(req.user._id === id){
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

    if(req.user._id === id){
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

export const toogleSubscribe = async (req, res, next) => {
    const channelsUserId = req.params.id;
    try {
        const user = await User.findById(req.user._id);
        const subscribedUsers = user.subscribedUsers;
        const isSubscribed = subscribedUsers.filter((subscriber) => subscriber === String(channelsUserId));
        if(isSubscribed.length === 0){
            await User.findByIdAndUpdate(req.user._id, { $push: {subscribedUsers: String(channelsUserId)}});
            const subscribedChannel = await User.findByIdAndUpdate(channelsUserId, { $inc: {subscribers: 1}}, {new: true})
            console.log('subscribedChannel',subscribedChannel);
            return res.status(200).json({
                resChannel: subscribedChannel,
                message: 'Subscribed to this channel'
            });
        }else{
            await User.findByIdAndUpdate(req.user._id, {$pull: {subscribedUsers: String(channelsUserId)}});

            const UnsubscribedChannel = await User.findByIdAndUpdate(channelsUserId, { $inc: {subscribers: -1}}, {new: true})
            console.log('UnsubscribedChannel',UnsubscribedChannel);
            return res.status(200).json({
                resChannel: UnsubscribedChannel,
                message: 'Unsubscribed to this channel'
            });  
        }
    } catch (err) {
        next(err);
    }
}



