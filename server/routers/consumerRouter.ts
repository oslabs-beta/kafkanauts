import express from 'express';
import consumerController from '../controllers/consumerController.js';
const router = express.Router();

router.get('/consumer', (req: any, res: any) => {
  return res.status(200).json(res.locals/*.whatever*/);
});

export default router;