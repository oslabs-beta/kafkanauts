import { Router, Request, Response } from 'express';
import consumerController from '../controllers/consumerController';

const router: Router = Router();

router.get('/consumer', (req: Request, res: Response) => {
  return res.status(200).json(res.locals/*.whatever*/);
});

export default router;