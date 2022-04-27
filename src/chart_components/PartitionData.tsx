import React from 'react';
import { Col } from '@themesberg/react-bootstrap';
import CounterWidget from '../components/Widgets';

export default function PartitionData({ partitionTotalCount, partitionOfflineCount }): JSX.Element {
  return (
    <>
      {partitionTotalCount.isLoading ? (
        <>Loading</>
      ) : (
        <Col xs={12} sm={6} xl={4} className='mb-4'>
          <CounterWidget
            category='Topics'
            title='Total Partition Count'
            value={partitionTotalCount.data[0].value[1]}
            percentage={0.0}
          />
        </Col>
      )}
      {partitionOfflineCount.isLoading ? (
        <>Loading</>
      ) : (
        <Col xs={12} sm={6} xl={4} className='mb-4'>
          <CounterWidget
            category='Topics'
            title='Total Offline Partition Count'
            value={partitionOfflineCount.data[0].value[1]}
            percentage={0.0}
          />
        </Col>
      )}
    </>
  );
}
