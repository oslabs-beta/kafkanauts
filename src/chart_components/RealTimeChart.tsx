import ResizableBox from "../ResizableBox";
// import useDemoConfig from "../useDemoConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function DarkMode(props): JSX.Element {
  // const { data, randomizeData } = useDemoConfig({
  //   series: 10,
  //   dataType: "time",
  // });

  // console.log('this is data', data)


  // const { randomizeData } = useDemoConfig({
  //   series: 10,
  //   dataType: "time",
  // });

  // kafka_server_brokertopicmetrics_bytesin_total
  // kafka_server_brokertopicmetrics_bytesout_total
  // kafka_server_brokertopicmetrics_bytesrejected_total

  const date = new Date();

  type MyDatum = { primary: Date, secondary: number }
  
  const data = [
    {
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
      label: "Total Bytes Out"
    },
    {
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
      label: "Total Bytes In"
    },
    {
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
      label: "Total Bytes Rejected"
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
