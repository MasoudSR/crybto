import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./CoinDetails.module.css"
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import convertChartData from "../helper/convertChartData";
import convertToDate from "../helper/dateConverter";


const CoinDetails = () => {
    const params = useParams();

    const fetchCoin = () => axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`)
    const { data, error, isError, isLoading } = useQuery({ queryKey: ["coin", params.id], queryFn: fetchCoin })

    const fetchToman = () => axios.get("https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/price_dollar_rl/latest.json")
    const { data: tomanData , isLoading:tomanIsLoading } = useQuery({ queryKey: ["toman"], queryFn: fetchToman })

    const fetchCoinChart = () =>
        axios.get(
            `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY
            }`
        );
    const { data: chartData ,isLoading: chartIsLoading } = useQuery({ queryKey: ["chart", params.id], queryFn: fetchCoinChart });


    if (isLoading) {
        <h1 className={styles.alert}>Loading</h1>
    } else if (isError) {
        <h1 className={styles.alert}>${error.message}</h1>
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.coinDetails}>
                    <div className={styles.logo}>
                        <img src={data.data.image.large} alt={data.data.name} />
                        <h1>{data.data.symbol.toUpperCase()}</h1>
                    </div>
                    <h1>Name: {data.data.name}</h1>
                    <h1>Price: ${data.data.market_data.current_price.usd.toLocaleString()}</h1>
                    {tomanIsLoading ? <h1>Loading Toman Data</h1> : <h1>{(parseInt(tomanData.data.p) * 100 * data.data.market_data.current_price.usd).toLocaleString()} Toman</h1>}
                    
                    <h3>Last Update: {convertToDate(data.data.last_updated)}</h3>
                </div>
                <div className={styles.chartContainer}>
                    {chartIsLoading ? <h1>Loading Chart</h1> :
                        <ResponsiveContainer height={400}>
                            <LineChart
                                data={convertChartData(chartData.data.prices)}
                            >
                                <Line type="monotone" dataKey="price" stroke="#3874ff" strokeWidth="2px" />
                                <CartesianGrid stroke="#404042" />
                                <YAxis dataKey="price" domain={["auto", "auto"]} />
                                <XAxis dataKey="date" />
                                <Tooltip />
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
