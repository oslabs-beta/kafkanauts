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


            // const graph1 = [
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="Fetch, version=11"}`),
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="FetchConsumer, version=11"}`),
            // ]

            // const { data: { data: { result: graph2 } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="OffsetCommit, version=5"}`);

            // const { data: { data: { result: graph3 } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="Heartbeat, version=3"}`);

            // const { data: { data: { result: graph4 } } } = await axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="Metadata, version=6"}`);

            // const cards = [
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="ApiVersions, version=2"}`),
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="JoinGroup, version=5"}`),
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="FindCoordinator, version=2"}`),
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="CreateTopics, version=3"}`),
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="LeaderAndIsr, version=5"}`),
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="UpdateMetadata, version=7"}`),
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="SyncGroup, version=3"}`),
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="Produce, version=7"}`),
            //     axios.get(`http://localhost:${port}/api/v1/query?query=kafka_network_requestmetrics_requests_total{request="OffsetFetch, version=4"}`),
            // ];

            // const axiosGetAllGraph1 = await Promise.all(graph1);
            // const destructureResultsForGraph1 = axiosGetAllGraph1.map(promResult => promResult.data.data.result);

            // const axiosGetAllCards = await Promise.all(cards);
            // const destructureResultsForCards = axiosGetAllCards.map(promResult => promResult.data.data.result);

            // const [[{ metric: { instance, job, request: requestForFetch }, value: [ unixTime, value ] }], {metric: { request: requestForFetchConsumer }}] = destructureResultsForGraph1;
            // // console.log(destructureResultsForGraph1)
            // const graph1MetricsFormatted = {
            //     instance,
            //     job,
            //     time: unixTime * 1000,
            //     data: {
                  
            //     }
            // };




            res.locals.overviewMetrics = networkMetricsFormatted;
            return next();
        } catch (e) {
            return next(e);
        }
    }
}
  export default overviewController;