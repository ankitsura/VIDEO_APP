import express from  'express';
import { addVideo, addView, deleteVideo, dislike, getAllVideos, getByTags, getVideo, like, random, search, subscribed, trend, updateVideo } from '../controllers/videoControllers.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get('/find/:id', getVideo);
router.get('/', getAllVideos);
router.get('/trend', trend);
router.get('/random', random);
router.get('/tags', getByTags);
router.get('/search', search);

router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);
router.get('/sub', verifyToken, subscribed);
router.put('/view/:id', verifyToken, addView);
router.put('/like/:videoId', verifyToken, like);
router.put('/dislike/:videoId', verifyToken, dislike);

export default router;