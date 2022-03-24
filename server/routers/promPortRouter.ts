import express from 'express';
import { isPromPortUp, savePortToElectronStore } from '../controllers/promPortController.js';
const router = express.Router();

router.post('/', isPromPortUp, savePortToElectronStore, (req: any, res: any) => {
  return res.status(200).json({status: 'success'});
});

export default router;
