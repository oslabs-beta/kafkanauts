import React from 'react'
import './styles/PartitionData.scss'

export default function PartitionData({partitionTotalCount, partitionOfflineCount}): JSX.Element {
  return (
    <div className='container'>
    <div>
      <div>Total Partition Count:{' '}</div>
        {
        partitionTotalCount.isLoading ?
        <>Loading</> :
        <div className={partitionTotalCount.data[0].value[1] <= 0 ? 'rectangle-red' : 'rectangle-green'} >
          {partitionTotalCount.data[0].value[1]}
        </div>
      }
    </div>
    <div>
      <div>Offline Partition Count:{' '}</div>
      <div style={{display: "grid"}}>
        {
          partitionOfflineCount.isLoading ?
          <>Loading</> : 
          <div className={partitionOfflineCount.data[0].value[1] >= 1 ? 'rectangle-red' : 'rectangle-green'} style={{position: "relative"}}>
            {partitionOfflineCount.data[0].value[1]}
          </div>
        }
      </div>
    </div>
  </div>
  )
}
