import { useState } from "react";
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import convertChartData from "../helper/convertChartData";
import styles from "./CoinChart.module.css"

import Skeleton from 'react-loading-skeleton'
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function CoinChart({ coinId }) {


    const [chartDays, setChartDays] = useState("7")
    const [chartInterval, setChartInterval] = useState(28)


    const fetchCoinChart = () =>
        axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${chartDays}&precision=2&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY
            }`
        );
    const { data: chartData, isLoading: chartIsLoading, isError: isChartError } = useQuery({ queryKey: ["chart", coinId, chartDays], queryFn: fetchCoinChart, refetchInterval: 3 * 60 * 1000, staleTime: 5 * 60 * 1000 });


    const chartDaysHandler = (day) => {
        switch (day) {
            case 7:
                setChartDays("7")
                setChartInterval(28)
                break;
            case 30:
                setChartDays("30&interval=daily")
                setChartInterval(5)
                break;
            case 90:
                setChartDays("90&interval=daily")
                setChartInterval(15)
                break;
            case 180:
                setChartDays("180&interval=daily")
                setChartInterval(30)
                break;
            case 365:
                setChartDays("365&interval=daily")
                setChartInterval(62)
                break;
            default:
                break;
        }
    }

    return (
        <div>{!isChartError &&
            <div className={styles.chartContainer}>
                <div className={styles.chartHeader}>
                    <h2>Price Changes Chart</h2>
                    <div className={styles.chartButtons}>
                        <button className={chartDays == "7" ? styles.activeBtn : styles.chartBtn} onClick={() => { chartDaysHandler(7) }}>7 Days</button>
                        <button className={chartDays == "30&interval=daily" ? styles.activeBtn : styles.chartBtn} onClick={() => { chartDaysHandler(30) }}>30 Days</button>
                        <button className={chartDays == "90&interval=daily" ? styles.activeBtn : styles.chartBtn} onClick={() => { chartDaysHandler(90) }}>3 Months</button>
                        <button className={chartDays == "180&interval=daily" ? styles.activeBtn : styles.chartBtn} onClick={() => { chartDaysHandler(180) }}>6 Months</button>
                        <button className={chartDays == "36&interval=daily" ? styles.activeBtn : styles.chartBtn} onClick={() => { chartDaysHandler(365) }}>1 Year</button>
                    </div>
                </div>
                {
                    chartIsLoading ?
                        <Skeleton height={400} />
                        :
                        <div>
                            <ResponsiveContainer height={400}>
                                <LineChart
                                    data={convertChartData(chartData.data.prices)}
                                >
                                    <Line type="monotone" dataKey="price" stroke="#3874ff" strokeWidth="2px" />
                                    <CartesianGrid stroke="#404042" />
                                    <YAxis dataKey="price" domain={["auto", "auto"]} hide />
                                    <XAxis dataKey="shortDate" interval={chartInterval} />
                                    <Tooltip content={"test"} />
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                }
            </div>}</div>
    )
}

export default CoinChart