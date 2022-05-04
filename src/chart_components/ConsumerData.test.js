import { render, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ConsumerData from './ConsumerData'

describe('Consumer Data Component', () => {
  const sampleMetric = {
    metric: {
        __name__: "kafka_server_delayedfetchmetrics_expirespersec_fetchertype_consumer",
        instance: "kafka:7071",
        job: "kafka"
    },
    values: [
        [
            1651704733.908,
            "545"
        ]
    ]
  }
  const { queryByTitle } = render( <ConsumerData consumerLag={{data: [sampleMetric]}}/>)
  const graph = queryByTitle('consumer-graph')
  expect(graph).toBeValid
})


