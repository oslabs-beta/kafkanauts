import React from 'react';
import SpecificMetric from './SpecificMetric';

const metricNames = ['Partition', 'Producer', 'Topic', 'Consumer', 'In/Out'];

const GeneralMetric = () => {
  return (
    <div>
      {metricNames.map((name) => (
        <React.Fragment key={name}>
          <h4>{name} metrics: </h4>
          <SpecificMetric metricName={name} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default GeneralMetric;
