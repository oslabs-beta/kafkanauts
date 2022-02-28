import React from "react";

const SpecificMetric = ({ metricName }) => {
  return (
    <React.Fragment>
      {(() => {
        switch (metricName) {
          case "Partition":
            return (
              <ul>
                <li>Total Partition Count: </li>
                <li>Offline Partition Count: </li>
              </ul>
            );
          case "Producer":
            return (
              <ul>
                <li>Total Producer Requests: </li>
                <li>Total failed producer requests: </li>
              </ul>
            );
          case "Topic":
            return (
              <ul>
                <li>Total Topic Count: </li>
                <li>Total Topic Metrics: </li>
              </ul>
            );
          case "Consumer":
            return <p>Coming Soon!!!</p>;
          case "In/Out":
            return (
              <ul>
                <li>Total Bytes In: KBs</li>
                <li>Total Bytes Out: KBs</li>
              </ul>
            );
          default:
            return <h6>Loading...</h6>;
        }
      })(metricName)}
    </React.Fragment>
  );
};

export default SpecificMetric;
