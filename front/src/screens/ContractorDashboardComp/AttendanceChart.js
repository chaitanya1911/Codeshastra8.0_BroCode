import React from 'react';
import {
    ResponsiveContainer,
    BarChart, Legend, Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const AttendanceChart = () => {

    const data = [
        {
            name: 'Page A',
            present: 4000,
            absent: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            present: 3000,
            absent: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            present: 2000,
            absent: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            present: 2780,
            absent: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            present: 1890,
            absent: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            present: 2390,
            absent: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            present: 3490,
            absent: 4300,
            amt: 2100,
        },
    ];

    const Graph = () => {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={1000}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="absent" stackId="a" fill="#10c9b1" />
                    <Bar dataKey="present" stackId="a" fill="#1ea896" />
                </BarChart>
            </ResponsiveContainer>
        );
    }

    return (
        <>
            <div style={{ width: "100%", height: 430 }}>
                <Graph />
            </div>

        </>
    )
}

export default AttendanceChart