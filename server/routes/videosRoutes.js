import express from  'express';
import { addVideo, addView, deleteVideo, getVideo, random, subscribed, trend, updateVideo } from '../controllers/videoControllers.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.get('/find/:id', getVideo);
router.post('/', verifyToken, addVideo);
router.put('/:id', verifyToken, updateVideo);
router.delete('/:id', verifyToken, deleteVideo);
router.get('/sub', verifyToken, subscribed);
router.put('/view/:id', verifyToken, addView);
router.get('/trend', trend);
router.get('/random', random);

export default router;