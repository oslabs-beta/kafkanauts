import React from 'react'

export default function TopicData({ topicTotalCount }): JSX.Element {
  return (
    <ul>
      <li>
        Total Topic Count: {topicTotalCount.data[0].value[1]}
      </li>
      {/* <li>Total Topic Metrics: </li> */}
    </ul>
  );
}
