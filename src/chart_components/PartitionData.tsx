import React from 'react'
import { Card } from '@themesberg/react-bootstrap';
import { CounterWidget } from '../components/Widget';
import './styles/PartitionData.scss'

export default function PartitionData({ partitionTotalCount, partitionOfflineCount, partitionUnderreplicated, partitionActiveController, partitionReqLatency }): JSX.Element {
  const totalCount = partitionTotalCount.data.count
  const offlineCount = partitionOfflineCount.data.count
  const underreplicatedArray = partitionUnderreplicated.data.underreplicated
  const activeControllerCount = partitionActiveController.data.count
  const partitionLatencyArray = partitionReqLatency.data.requestLatency
  console.log('underreplicatedArray: ', underreplicatedArray)
  const underreplicatedComponents = underreplicatedArray.map((el, i) =>
    <div key={i}>
      <CounterWidget
        category={el.topic}
        title={`Instance: ${partitionUnderreplicated.instance}`}
        value={el.count}
        percentage={`Job: ${partitionUnderreplicated.job}`}
      />
    </div>
  )
  if (underreplicatedComponents.length === 0) {
    underreplicatedComponents.push(
      <div>
        <CounterWidget
          category='Underreplicated Partition'
          title={`Instance: ${partitionUnderreplicated.instance}`}
          value='0'
          percentage={`Job: ${partitionUnderreplicated.job}`}
        />
      </div>
    )
  }

  const partitionLatencyComponents = partitionLatencyArray.map((el, i) => (
    <div key={i}>
      <CounterWidget
        category={el.nameOfRequest}
        title={`Instance: ${partitionReqLatency.instance}`}
        value={el.latency}
        percentage={`Job: ${partitionReqLatency.job}`}
      />
    </div>
  ))
  return (
    <div>
      <div className='content-container'>
        <div className='card-item'>
          <Card key={'total-part-count'} border={totalCount < 0 ? 'danger' : 'success'} style={{ width: '18rem', borderWidth: 'medium' }} >
            <Card.Header as={'h4'} >Kafka Controller</Card.Header>
            <Card.Body>
              <Card.Title as={'h5'} >Global Partition Count</Card.Title>
              <Card.Text as={'h6'} >{totalCount}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className='card-item'>
          <Card key={'active-controller-count'} border={activeControllerCount > 1 ? 'danger' : 'success'} style={{ width: '18rem', borderWidth: 'medium' }} >
            <Card.Header as={'h4'} >Kafka Controller</Card.Header>
            <Card.Body>
              <Card.Title as={'h5'} >Active Controller Count</Card.Title>
              <Card.Text as={'h6'} >{activeControllerCount}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className='card-item'>
          <Card key={'offline-partition-count'} border={offlineCount > 0 ? 'danger' : 'success'} style={{ width: '18rem', borderWidth: 'medium' }} >
            <Card.Header as={'h4'} >Kafka Controller</Card.Header>
            <Card.Body>
              <Card.Title as={'h5'} >Offline Partition Count</Card.Title>
              <Card.Text as={'h6'} >{offlineCount}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className='content-container'>
        {
          underreplicatedComponents
        }
        <br />
        {
          partitionLatencyComponents
        }
      </div>
    </div>
  )
}
