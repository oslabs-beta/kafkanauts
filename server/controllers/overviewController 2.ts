import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const overviewController = {
    //Metrics to show Request Metrics
    async overviewMetrics(req: Request, res: Response, next: NextFunction) {
        try {
            const { port } = res.locals;
            const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total`);
            res.locals.overviewMetrics = result;
            return next();
        } catch (e) {
            return next(e);
        }
    }
}
  export default overviewController;