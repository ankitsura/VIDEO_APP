import express from  'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRoutes from './routes/usersRoutes.js';
import videosRoutes from './routes/videosRoutes.js';
import commentsRoutes from './routes/commentsRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app =  express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/comments', commentsRoutes);

app.use((err, req, res, next) => {
    if(err){
        const status = err.status || 500;
        const message = err.message || "Something went wrong";
        return res.status(status).json({
            success: false,
            status,
            message
        });
    }
});

const PORT =  process.env.PORT || 5000;
const CONNECTION_URL =  process.env.CONNECTION_URL;

mongoose.connect(CONNECTION_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => console.log(err.message));