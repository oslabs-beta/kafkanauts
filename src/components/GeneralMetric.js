import React from 'react';
import SpecificMetric from './SpecificMetric';

const metricNames = ['Partition', 'Producer', 'Topic', 'Consumer', 'In/Out'];

const GeneralMetric = () => {
  return (
    <div>
      {metricNames.map((name) => (
        <>
          <h4>{name} metrics: </h4>
          <SpecificMetric metricName={name} />
        </>
      ))}
    </div>
  );
};

export default GeneralMetric;
