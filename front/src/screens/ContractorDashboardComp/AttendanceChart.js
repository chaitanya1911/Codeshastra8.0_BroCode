import React from 'react';
import {
    ResponsiveContainer,
    BarChart, Legend, Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const AttendanceChart = ({dash12, ind}) => {

    const data = [
        {
            name: 'Jan',
            present: dash12.jan.present[ind],
            absent: dash12.jan.absenr[ind],
            amt: dash12.jan.amt[ind],
        },
        {
            name:"Feb",
            present: dash12.feb.present[ind],
            absent: dash12.feb.absenr[ind],
            amt: dash12.feb.amt[ind],
        },
        {
            name: 'Mar',
            present: dash12.mar.present[ind],
            absent: dash12.mar.absenr[ind],
            amt: dash12.mar.amt[ind],
        },
        {
            name: 'Apr',
            present: dash12.apr.present[ind],
            absent: dash12.apr.absenr[ind],
            amt: dash12.apr.amt[ind],
        },
        {
            name: 'May',
            present: dash12.may.present[ind],
            absent: dash12.may.absenr[ind],
            amt: dash12.may.amt[ind],
        },
        {
            name: 'Jun',
            present: dash12.jun.present[ind],
            absent: dash12.jun.absenr[ind],
            amt: dash12.jun.amt[ind],
        },
        {
            name: 'Jul',
            present: dash12.jul.present[ind],
            absent: dash12.jul.absenr[ind],
            amt: dash12.jul.amt[ind],
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