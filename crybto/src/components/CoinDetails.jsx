import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styles from "./CoinDetails.module.css"
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import convertChartData from "../helper/convertChartData";
import { convertToFullDate } from "../helper/dateConverter";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { useState } from "react";
import CoinDetailsLoading from "./Loading/CoinDetailsLoading";
import Skeleton from 'react-loading-skeleton'
import { MdArrowBack } from "react-icons/md";


const CoinDetails = () => {
    const params = useParams();

    const [chartDays, setChartDays] = useState("7")
    const [chartInterval, setChartInterval] = useState(28)

    const fetchCoin = () => axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&community_data=false&developer_data=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`)
    const { data, error, isError, isLoading } = useQuery({ queryKey: ["coin", params.id], queryFn: fetchCoin, refetchInterval: 3 * 60 * 1000 })

    const fetchToman = () => axios.get("https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/price_dollar_rl/latest.json")
    const { data: tomanData, isLoading: tomanIsLoading, isError: isTomanError } = useQuery({ queryKey: ["toman"], queryFn: fetchToman, refetchInterval: 3 * 60 * 1000 })

    const fetchCoinChart = () =>
        axios.get(
            `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=${chartDays}&precision=2&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY
            }`
        );
    const { data: chartData, isLoading: chartIsLoading, isError: isChartError } = useQuery({ queryKey: ["chart", params.id, chartDays], queryFn: fetchCoinChart, refetchInterval: 3 * 60 * 1000 });

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

    if (isLoading) {
        return <CoinDetailsLoading />
    } else if (isError) {
        return <h1 className={styles.alert}>${error.message}</h1>
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <Link to={"/"}>
                        <MdArrowBack size={30} />
                    </Link>
                    <img src={data.data.image.large} alt={data.data.name} />
                    <h1>{data.data.name}<span className={styles.symbol}>({data.data.symbol.toUpperCase()})</span></h1>
                </div>
                <div className={styles.coinDetails}>
                    <table className={styles.coinDetailsTable}>
                        <tbody>
                            <tr>
                                <td>${data.data.market_data.current_price.usd.toLocaleString()}</td>
                                {tomanIsLoading ? <td>Getting Current Toman Price</td> :
                                    !isTomanError && <td className={styles.toman}>{parseInt((parseInt(tomanData.data.p) * 100 * data.data.market_data.current_price.usd)).toLocaleString()} تومان</td>}
                            </tr>
                            <tr>
                                <td>Last Update</td>
                                <td>{convertToFullDate(data.data.last_updated)}</td>
                            </tr>
                            <tr>
                                <td>Market cap rank</td>
                                <td>{data.data.market_cap_rank}</td>
                            </tr>
                            <tr>
                                <td>Market cap</td>
                                <td>${data.data.market_data.market_cap.usd.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Total volume</td>
                                <td>${data.data.market_data.total_volume.usd.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Lowest in 24 hours</td>
                                <td>${data.data.market_data.low_24h.usd.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Price change in 24 hours</td>
                                <td>${data.data.market_data.price_change_24h_in_currency.usd.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Highest in 24 hours</td>
                                <td>${data.data.market_data.high_24h.usd.toLocaleString()}</td>
                            </tr>
                            <tr>
                                <td>Price change in 24 hours</td>
                                <td>
                                    <span className={`${styles.percentage} ${data.data.market_data.price_change_percentage_24h >= 0 ? styles.green : styles.red}`}>
                                        {data.data.market_data.price_change_percentage_24h >= 0 ? <TbTriangleFilled size={10} /> : <TbTriangleInvertedFilled size={10} />}
                                        {data.data.market_data.price_change_percentage_24h.toFixed(2)}%
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>Price change in 7 days</td>
                                <td>
                                    <span className={`${styles.percentage} ${data.data.market_data.price_change_percentage_7d >= 0 ? styles.green : styles.red}`}>
                                        {data.data.market_data.price_change_percentage_7d >= 0 ? <TbTriangleFilled size={10} /> : <TbTriangleInvertedFilled size={10} />}
                                        {data.data.market_data.price_change_percentage_7d.toFixed(2)}%
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>Price change in 30 days</td>
                                <td>
                                    <span className={`${styles.percentage} ${data.data.market_data.price_change_percentage_30d >= 0 ? styles.green : styles.red}`}>
                                        {data.data.market_data.price_change_percentage_30d >= 0 ? <TbTriangleFilled size={10} /> : <TbTriangleInvertedFilled size={10} />}
                                        {data.data.market_data.price_change_percentage_30d.toFixed(2)}%
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>Price change in 1 year</td>
                                <td>
                                    <span className={`${styles.percentage} ${data.data.market_data.price_change_percentage_1y >= 0 ? styles.green : styles.red}`}>
                                        {data.data.market_data.price_change_percentage_1y >= 0 ? <TbTriangleFilled size={10} /> : <TbTriangleInvertedFilled size={10} />}
                                        {data.data.market_data.price_change_percentage_1y.toFixed(2)}%
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {!isChartError &&
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
                    </div>}
            </div>
        )
    }
}

export default CoinDetails
