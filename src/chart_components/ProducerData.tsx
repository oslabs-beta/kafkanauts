import React from 'react';
import { Col } from '@themesberg/react-bootstrap';
import CounterWidget from '../components/Widgets';

export default function ProducerData({ producerTotalReqCount, producerTotalFailCount }): JSX.Element {
  return (
    <>
      {producerTotalReqCount.isLoading ? (
        <>Loading</>
      ) : (
        <Col xs={12} sm={6} xl={4} className='mb-4'>
          <CounterWidget
            category='Producer'
            title='Total Producer Requests'
            value={producerTotalReqCount.data[0].value[1]}
            percentage={0.0}
          />
        </Col>
      )}
      {producerTotalFailCount.isLoading ? (
        <>Loading</>
      ) : (
        <Col xs={12} sm={6} xl={4} className='mb-4'>
          <CounterWidget
            category='Producer'
            title='Total Failed Producer Requests'
            value={producerTotalFailCount.data[0].value[1]}
            percentage={0.0}
          />
        </Col>
      )}
    </>
  );
}
