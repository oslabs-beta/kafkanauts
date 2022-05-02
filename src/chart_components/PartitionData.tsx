import React from 'react'
import { Card }  from '@themesberg/react-bootstrap';
import './styles/PartitionData.scss'

export default function PartitionData({partitionTotalCount, partitionOfflineCount, partitionUnderreplicated, partitionActiveController, partitionReqLatency}): JSX.Element {
  const totalCount = partitionTotalCount.data.count
  const offlineCount = partitionOfflineCount.data.count
  const underreplicatedArray = partitionUnderreplicated.data.underreplicated
  const activeControllerCount = partitionActiveController.data.count
  const partitionLatencyArray = partitionReqLatency.data.requestLatency
console.log('underreplicatedArray: ', underreplicatedArray)
  const underreplicatedComponents = underreplicatedArray.map((el, i) => (
    <>
      <Card key={i} border={'danger'} style={{ width: '18rem', borderWidth: 'medium' }} >
        <Card.Header as={'h4'} >Underreplicated Partition Detected</Card.Header>
        <Card.Body>
          <Card.Title as={'h5'} >{el.topic}</Card.Title>
          <Card.Text as={'h6'} >Partition: {el.partition}<br/>Underreplicated count: {el.count}</Card.Text>
        </Card.Body>
      </Card>
      <br/>
    </>
  ))

  const partitionLatencyComponents = partitionLatencyArray.map((el, i) => (
    <>
      <Card key={i} border={el.latency > 1000 ? 'danger' : 'success'} style={{ width: '18rem', borderWidth: 'medium' }} >
        <Card.Header as={'h4'} >Partition Latency</Card.Header>
        <Card.Body>
          <Card.Title as={'h5'} >{el.nameOfRequest}</Card.Title>
          <Card.Text as={'h6'} >{el.latency.toLocaleString()} ms</Card.Text>
        </Card.Body>
      </Card>
      <br/>
    </>
  ))
  return (
    <>
      <Card key={'total-part-count'} border={totalCount < 0 ? 'danger' : 'success'} style={{ width: '18rem', borderWidth: 'medium' }} >
        <Card.Header as={'h4'} >Kafka Controller</Card.Header>
        <Card.Body>
          <Card.Title as={'h5'} >Global Partition Count</Card.Title>
          <Card.Text as={'h6'} >{totalCount}</Card.Text>
        </Card.Body>
      </Card>
      <br/>
      <Card key={'active-controller-count'} border={activeControllerCount > 1 ? 'danger' : 'success'} style={{ width: '18rem', borderWidth: 'medium' }} >
        <Card.Header as={'h4'} >Kafka Controller</Card.Header>
        <Card.Body>
          <Card.Title as={'h5'} >Active Controller Count</Card.Title>
          <Card.Text as={'h6'} >{activeControllerCount}</Card.Text>
        </Card.Body>
      </Card>
      <br/>
      <Card key={'offline-partition-count'} border={offlineCount > 0 ? 'danger' : 'success'} style={{ width: '18rem', borderWidth: 'medium' }} >
        <Card.Header as={'h4'} >Kafka Controller</Card.Header>
        <Card.Body>
          <Card.Title as={'h5'} >Offline Partition Count</Card.Title>
          <Card.Text as={'h6'} >{offlineCount}</Card.Text>
        </Card.Body>
      </Card>
      <br/>
      {
        underreplicatedArray.length === 0 ? 'No underreplicated partitions' : underreplicatedComponents
      }
      <br/>
      {
        partitionLatencyComponents
      }
      
  </>
  )
}
