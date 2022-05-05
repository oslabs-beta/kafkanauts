import React, { useState, useEffect } from 'react'
import { Col } from '@themesberg/react-bootstrap';
import RealTimeChart from './RealTimeChart'
import { CounterWidget } from '../components/Widget';
import './styles/Overview.scss';

export default function OverviewData({ overviewMetrics }): JSX.Element {

    // const initialTime = new Date(new Date().getTime() - 100000)
    // console.log('overviewMetrics', overviewMetrics);
    const [graphFetch, setGraphFetch] = useState([])
    const [graphOffsetCommit, setOffsetCommit] = useState([])
    const [graphHeartbeat, setHeartbeat] = useState([])
    const [graphMetadata, setMetadata] = useState([])
    // const [cards, setCards] = useState([])
    const overviewWidgets = overviewMetrics.data.cards.map(([request, value], i) => (
        <div>
            <CounterWidget
                category='test'
                title={request}
                value={value}
                percentage={0.0}
            />
        </div>
    ))
    useEffect(() => {
        const dateOfMetric = new Date(overviewMetrics.time)
        setGraphFetch(prev => {
            const shallowCopyofFetch = [...prev]
            overviewMetrics.data.graph1.forEach(([request, value]) => {
                const indexOfRequest = shallowCopyofFetch.findIndex(el => el.label === request)
                if (indexOfRequest < 0) {
                    // if topic line doesnt exist in graph, then push the new line into "inData"
                    const newLine = {
                        label: request,
                        data: [
                            {
                                primary: dateOfMetric,
                                secondary: value,
                            }
                        ],
                    }
                    shallowCopyofFetch.push(newLine)
                } else {
                    // if topic line already exists in graph, then just push new data point into "inData"
                    const dataPoint = {
                        primary: dateOfMetric,
                        secondary: value,
                    }
                    shallowCopyofFetch[indexOfRequest].data.push(dataPoint)

                    if (shallowCopyofFetch[indexOfRequest].data.length > 100) {
                        shallowCopyofFetch[indexOfRequest].data.shift()
                    }
                }
            })
            return shallowCopyofFetch
        })

        setOffsetCommit(prev => {
            const shallowCopyofOffset = [...prev]
            overviewMetrics.data.graph2.forEach(([request, value]) => {
                const indexOfRequest = shallowCopyofOffset.findIndex(el => el.label === request)
                if (indexOfRequest < 0) {
                    // if topic line doesnt exist in graph, then push the new line into "inData"
                    const newLine = {
                        label: request,
                        data: [
                            {
                                primary: dateOfMetric,
                                secondary: value,
                            }
                        ],
                    }
                    shallowCopyofOffset.push(newLine)
                } else {
                    // if topic line already exists in graph, then just push new data point into "inData"
                    const dataPoint = {
                        primary: dateOfMetric,
                        secondary: value,
                    }
                    shallowCopyofOffset[indexOfRequest].data.push(dataPoint)

                    if (shallowCopyofOffset[indexOfRequest].data.length > 100) {
                        shallowCopyofOffset[indexOfRequest].data.shift()
                    }
                }
            })
            return shallowCopyofOffset
        })
        setHeartbeat(prev => {
            const shallowCopyofHeartbeat = [...prev]
            overviewMetrics.data.graph3.forEach(([request, value]) => {
                const indexOfRequest = shallowCopyofHeartbeat.findIndex(el => el.label === request)
                if (indexOfRequest < 0) {
                    // if topic line doesnt exist in graph, then push the new line into "inData"
                    const newLine = {
                        label: request,
                        data: [
                            {
                                primary: dateOfMetric,
                                secondary: value,
                            }
                        ],
                    }
                    shallowCopyofHeartbeat.push(newLine)
                } else {
                    // if topic line already exists in graph, then just push new data point into "inData"
                    const dataPoint = {
                        primary: dateOfMetric,
                        secondary: value,
                    }
                    shallowCopyofHeartbeat[indexOfRequest].data.push(dataPoint)

                    if (shallowCopyofHeartbeat[indexOfRequest].data.length > 100) {
                        shallowCopyofHeartbeat[indexOfRequest].data.shift()
                    }
                }
            })
            return shallowCopyofHeartbeat
        })

        setMetadata(prev => {
            const shallowCopyofMetadata = [...prev]
            overviewMetrics.data.graph4.forEach(([request, value]) => {
                const indexOfRequest = shallowCopyofMetadata.findIndex(el => el.label === request)
                if (indexOfRequest < 0) {
                    // if topic line doesnt exist in graph, then push the new line into "inData"
                    const newLine = {
                        label: request,
                        data: [
                            {
                                primary: dateOfMetric,
                                secondary: value,
                            }
                        ],
                    }
                    shallowCopyofMetadata.push(newLine)
                } else {
                    // if topic line already exists in graph, then just push new data point into "inData"
                    const dataPoint = {
                        primary: dateOfMetric,
                        secondary: value,
                    }
                    shallowCopyofMetadata[indexOfRequest].data.push(dataPoint)

                    if (shallowCopyofMetadata[indexOfRequest].data.length > 100) {
                        shallowCopyofMetadata[indexOfRequest].data.shift()
                    }
                }
            })
            return shallowCopyofMetadata
        })


    }, [overviewMetrics]);
    return (
        <div>
            <div className='content-container'>
                <RealTimeChart metrics={graphFetch} />
                <RealTimeChart metrics={graphOffsetCommit} />
                <RealTimeChart metrics={graphHeartbeat} />
                <RealTimeChart metrics={graphMetadata} />
            </div>
            <div className='content-container'> {overviewWidgets} </div>
        </div>
    );
}