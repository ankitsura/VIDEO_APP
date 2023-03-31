import express from  'express';
import { addVideo, addView, deleteVideo, getAllVideos, getByTags, getVideo, random, search, subscribed, trend, updateVideo } from '../controllers/videoControllers.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get('/find/:id', getVideo);
router.get('/', getAllVideos);
router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);
router.get('/sub', verifyToken, subscribed);
router.put('/view/:id', verifyToken, addView);
router.get('/trend', trend);
router.get('/random', random);
router.get('/tags', getByTags);
router.get('/search', search);

export default router;