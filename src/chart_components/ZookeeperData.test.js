import { render, fireEvent } from '@testing-library/react'
import ZookeeperData from './ZookeeperData'

describe('Zookeeper Data Component', () => {
  const sampleMetric = {
    metric: {
        __name__: "kafka_server_delayedfetchmetrics_expirespersec_fetchertype_consumer",
        instance: "kafka:7071",
        job: "kafka"
    },
    value: [
        1651704733.908,
        "545"
    ]
  }
  const { queryByTitle } = render( <ZookeeperData avgLatency={{data: [sampleMetric]}}/>)
  const lineItem = queryByTitle('zk-latency')
  expect(lineItem).toBeTruthy
})