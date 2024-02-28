import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./CoinDetails.module.css"
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import convertChartData from "../helper/convertChartData";
import { convertToDay, convertToFullDate } from "../helper/dateConverter";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";



const CoinDetails = () => {
    const params = useParams();

    const fetchCoin = () => axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&community_data=false&developer_data=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`)
    const { data, error, isError, isLoading } = useQuery({ queryKey: ["coin", params.id], queryFn: fetchCoin })

    const fetchToman = () => axios.get("https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/price_dollar_rl/latest.json")
    const { data: tomanData, isLoading: tomanIsLoading, isError: isTomanError } = useQuery({ queryKey: ["toman"], queryFn: fetchToman })

    const fetchCoinChart = () =>
        axios.get(
            `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=7&precision=2&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY
            }`
        );
    const { data: chartData, isLoading: chartIsLoading, isError: isChartError } = useQuery({ queryKey: ["chart", params.id], queryFn: fetchCoinChart });


    if (isLoading) {
        return <h1 className={styles.alert}>Loading</h1>
    } else if (isError) {
        return <h1 className={styles.alert}>${error.message}</h1>
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <img src={data.data.image.large} alt={data.data.name} />
                    <h1>{data.data.name} <span className={styles.symbol}>({data.data.symbol.toUpperCase()})</span></h1>
                    <h1></h1>
                </div>
                <div className={styles.coinDetails}>
                    <table className={styles.coinDetailsTable}>
                        <tr>
                            <td>${data.data.market_data.current_price.usd.toLocaleString()}</td>
                            {tomanIsLoading ? <td>Getting Current Toman Price</td> :
                                !isTomanError && <td className={styles.toman}>{(parseInt(tomanData.data.p) * 100 * data.data.market_data.current_price.usd).toLocaleString()} تومان</td>}
                        </tr>
                        <tr>
                            <td>Last Update</td>
                            <td>{convertToFullDate(data.data.last_updated)}</td>
                        </tr>
                        <tr>
                            <td>Block time in minutes</td>
                            <td>{data.data.block_time_in_minutes}</td>
                        </tr>
                        <tr>
                            <td>Hashing Algorithm</td>
                            <td>{data.data.hashing_algorithm}</td>
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
                            <td>Price % change in 24 hours</td>
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
                    </table>
                </div>
                <div className={styles.chartContainer}>
                    {chartIsLoading ? <h1>Loading Chart</h1> :
                        !isChartError &&
                        <ResponsiveContainer height={400}>
                            <LineChart
                                data={convertChartData(chartData.data.prices)}
                            >
                                <Line type="monotone" dataKey="price" stroke="#3874ff" strokeWidth="2px" />
                                <CartesianGrid stroke="#404042" />
                                <YAxis dataKey="price" domain={["auto", "auto"]} hide />
                                <XAxis dataKey="shortDate" interval={24} />
                                <Tooltip dataKey="date" />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    }
                </div>
            </div>
        )
    }
}

export default CoinDetails
