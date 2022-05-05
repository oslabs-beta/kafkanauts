import ResizableBox from "../ResizableBox";
import React, {useEffect, useState} from "react";
import { AxisOptions, Chart } from "react-charts";

export default function RealTimeChart(props): JSX.Element {

  // const date = new Date();

  type MyDatum = { primary: Date, secondary: number }

  const [data, setData] = useState([])

  //create a new set of data because React Charts needs to know when data is changed
  useEffect(() => {
    setData([...props.metrics])
    // setData(props.metrics.map(e => Object.assign({}, e)))
    console.log(data)
  }, [props.metrics])
  

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
      <ResizableBox
        style={{
          background: "rgba(0, 27, 45, 0.9)",
          padding: ".5rem",
          borderRadius: "5px",
        }}
      >
        <div style={{ width: "100%", height: "100%"}}>
          {data.length > 0 ? <Chart
            
            options={{
              data,
              primaryAxis,
              secondaryAxes,
              dark: true,
              
            }}
          /> : " "}
         
        </div>
      </ResizableBox>
  );
}
