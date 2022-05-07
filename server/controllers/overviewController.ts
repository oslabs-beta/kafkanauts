import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const overviewController = {
    //Metrics to show Request Metrics
    async overviewMetrics(req: Request, res: Response, next: NextFunction) {
        try {
            const { port } = res.locals;
            const { data: { data: { result } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total`)
            const [ { metric: { instance, job }, value: [ unixTime ] } ] = result
            const networkMetricsFormatted = {
                instance,
                job,
                time: unixTime * 1000,
                data: {
                  graph1: [],
                  graph2: [],
                  graph3: [],
                  graph4: [],
                  cards: [],
                }
            }
            result.forEach(el => {
                if (el.metric.request.match(/^Fetch/)) {
                    networkMetricsFormatted.data.graph1.push([el.metric.request, Number(el.value[1])])
                }
                if (el.metric.request.match(/OffsetCommit/)) {
                    networkMetricsFormatted.data.graph2.push([el.metric.request, Number(el.value[1])])
                }
                if (el.metric.request.match(/Heartbeat/)) {
                    networkMetricsFormatted.data.graph3.push([el.metric.request, Number(el.value[1])])
                }
                if (el.metric.request.match(/^Metadata/)) {
                    networkMetricsFormatted.data.graph4.push([el.metric.request, Number(el.value[1])])
                }
                if (el.metric.request.match(/(ApiVersions|JoinGroup|FindCoordinator|CreateTopics|LeaderAndIsr|UpdateMetadata|SyncGroup|Produce|OffsetFetch)/)) {
                    networkMetricsFormatted.data.cards.push([el.metric.request, Number(el.value[1])])
                }
            })



            res.locals.overviewMetrics = networkMetricsFormatted;
            return next();
        } catch (e) {
            return next(e);
        }
    }
}
  export default overviewController;