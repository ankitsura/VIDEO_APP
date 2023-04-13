import express from  'express';
import { uploadVideo, addView, deleteVideo, dislike, getAllVideos, getByTags, getVideo, like, random, search, subscribed, trend, updateVideo } from '../controllers/videoControllers.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get('/', getAllVideos);
router.get('/find/:id', getVideo);
router.get('/trend', trend);
router.get('/random', random);
router.get('/tags', getByTags);
router.get('/search', search);
router.get('/sub', verifyToken, subscribed);

router.post('/', verifyToken, uploadVideo);

router.patch('/:id', verifyToken, updateVideo);
router.patch('/view/:id', verifyToken, addView);
router.patch('/like/:id', verifyToken, like);
router.patch('/dislike/:id', verifyToken, dislike);

router.delete('/:id', verifyToken, deleteVideo);

export default router;