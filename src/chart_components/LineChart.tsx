import ResizableBox from "../ResizableBox";
import React, { useState } from "react";
import { AxisOptions, Chart } from "react-charts";

export default function LineChart({ metrics, title }): JSX.Element {
  console.log('metrics: ', metrics)
  const [lineData, setLineData] = useState([])
  const date = new Date();

  type MyDatum = { primary: Date, secondary: number }
  const data = []
  metrics.data.bytesIn.forEach(([topicName, bytes]) => {
    data.push({
      label: topicName,
      data: []
    })
  })
  const data1 = [
    {
      label: "Topic 1",
      data: [
        {
          primary: new Date(date.getTime() + 10000),
          secondary: 99.3
        },
        {
          primary: new Date(date.getTime() + 10001),
          secondary: 99.4
        },
      ],
    },
    {
      label: "Topic 2",
      data: [
        {
          primary: new Date(date.getTime() + 10000),
          secondary: 57.3
        },
        {
          primary: new Date(date.getTime() + 10001),
          secondary: 52.4
        },
      ],
    },
    {
      label: "Total Bytes Rejected",
      data: [
        {
          primary: new Date(date.getTime() + 10000),
          secondary: 88.3
        },
        {
          primary: new Date(date.getTime() + 10001),
          secondary: 81.4
        },
      ],
    }
  ]

  // console.log("this is data", props);

  // const primaryAxis = React.useMemo<
  //   AxisOptions<typeof data[number]["data"][number]>
  // >(
  //   () => ({
  //     getValue: (datum) => datum.primary as unknown as Date,
  //   }),
  //   []
  // );

  // const secondaryAxes = React.useMemo<
  //   AxisOptions<typeof data[number]["data"][number]>[]
  // >(
  //   () => [
  //     {
  //       getValue: (datum) => datum.secondary,
  //     },
  //   ],
  //   []
  // );

  const primaryAxis = React.useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: datum => datum.primary,
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: datum => datum.secondary,
      },
    ],
    []
  )

  return (
    <>
      <br />
      <br />
      <ResizableBox
        style={{
          background: "rgba(0, 27, 45, 0.9)",
          padding: ".5rem",
          borderRadius: "5px",
        }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
              dark: true,
            }}
          />
        </div>
      </ResizableBox>
    </>
  );
}
