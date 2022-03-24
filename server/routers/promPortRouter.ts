import express from 'express';
import promPortController from '../controllers/promPortController';
const router = express.Router();

router.post('/', promPortController.isPromPortUp, promPortController.savePortToElectronStore, (req: any, res: any) => {
  return res.status(200).json({status: 'success'});
});

export default router;
