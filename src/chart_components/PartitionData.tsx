import React from 'react'
import './styles/PartitionData.scss'

export default function PartitionData({partitionTotalCount, partitionOfflineCount, partitionUnderreplicated, partitionActiveController, partitionReqLatency}): JSX.Element {
  const totalCount = partitionTotalCount.data.count
  const offlineCount = partitionOfflineCount.data.count
  const underreplicatedArray = partitionUnderreplicated.data.underreplicated
  const activeControllerCount = partitionActiveController.data.count
  const partitionLatencyArray = partitionReqLatency.data.requestLatency
// console.log('partitionLatencyArray: ', partitionLatencyArray)
  // const underreplicatedComponents = underreplicatedArray.map(el => (
  //   <>
    
  //   </>
  // ))
  const partitionLatencyComponents = partitionLatencyArray.map(el => (
    <div>
      <div>
        Request: {el.nameOfRequest}
      </div>
      <div className={el.latency > 1000 ? 'rectangle-red' : 'rectangle-green'} >
        {el.latency} ms
      </div>
    </div>
  ))
  return (
    <div className='container-partition'>
      <div>Total Partition Count: </div>
        {
          <div className={totalCount <= 0 ? 'rectangle-red' : 'rectangle-green'} >
          {totalCount}
        </div>
      }
       <div>Active Controller Count: </div>
        {
          <div className={activeControllerCount <= 0 ? 'rectangle-red' : 'rectangle-green'} >
          {activeControllerCount}
        </div>
      }
    <div>
      <div>Offline Partition Count: </div>
      {/* <div style={{display: "grid"}}> */}
        {
          <div className={offlineCount >= 1 ? 'rectangle-red' : 'rectangle-green'} style={{position: "relative"}}>
            {offlineCount}
          </div>
        }
      {/* </div> */}

    </div>
    <div>
      {
        underreplicatedArray.length === 0 ? 'No underreplicated partitions' : JSON.stringify(partitionUnderreplicated.data.underreplicated)
      }
    </div>
    <>
      {
        partitionLatencyComponents
      }
    </>
  </div>
  )
}
