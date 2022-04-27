import { Router, Request, Response } from 'express';
import promPortController from '../controllers/promPortController';

const router: Router = Router();

router.post('/', promPortController.isPromPortUp, promPortController.savePortToElectronStore, (req: Request, res: Response) => {
  return res.status(200).json({status: 'success'});
});

export default router;
