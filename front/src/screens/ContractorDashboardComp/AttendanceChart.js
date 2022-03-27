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
            name: 'Jan',
            present: 40,
            absent: 24,
            amt: 24,
        },
        {
            name: 'Feb',
            present: 30,
            absent: 13,
            amt: 21,
        },
        {
            name: 'Mar',
            present: 20,
            absent: 90,
            amt: 29,
        },
        {
            name: 'Apr',
            present: 27,
            absent: 38,
            amt: 20,
        },
        {
            name: 'May',
            present: 18,
            absent: 48,
            amt: 21,
        },
        {
            name: 'Jun',
            present: 23,
            absent: 38,
            amt: 25,
        },
        {
            name: 'Jun',
            present: 34,
            absent: 43,
            amt: 21,
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