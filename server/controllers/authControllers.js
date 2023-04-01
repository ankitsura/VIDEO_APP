import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";
import { createError } from "../error.js";

dotenv.config();

export const signup = async (req, res, next) => {
    const {userName, email, password} = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await User.create({name: userName, email, password: hash});
        res.status(200).json({
            user: newUser,
            message: "Signed up successfully"
        });
    } catch (err) {
        next(err);
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) return next(createError(404, 'User not found'));

        if(!bcrypt.compareSync(req.body.password, user.password)) return next(createError(400, 'Incorrect username or password'));

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        const {password, ...others} = user._doc;

        res.cookie('access_token', token).status(200).json({
            others,
        });        
    } catch (err) {
        next(err);
    }
}