import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styles from "./CoinDetails.module.css"
import { useQuery } from "@tanstack/react-query";
import { convertToFullDate } from "../helper/dateConverter";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import CoinDetailsLoading from "./Loading/CoinDetailsLoading";
import { MdArrowBack } from "react-icons/md";
import CoinChart from "./CoinChart";
import Skeleton from "react-loading-skeleton";
import { useState } from "react";
import { addToFav, isFavorite, removeFromFav } from "../helper/favoritesManager";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";


const CoinDetails = () => {
    const params = useParams();

    const [favorite, setFavorite] = useState(isFavorite(params.id))

    const fetchCoin = () => axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}?localization=false&tickers=false&community_data=false&developer_data=false&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`)
    const { data, error, isError, isLoading } = useQuery({ queryKey: ["coin", params.id], queryFn: fetchCoin, refetchInterval: 3 * 60 * 1000 })

    const fetchToman = () => axios.get("https://raw.githubusercontent.com/margani/pricedb/main/tgju/current/price_dollar_rl/latest.json")
    const { data: tomanData, isLoading: tomanIsLoading, isError: isTomanError } = useQuery({ queryKey: ["toman"], queryFn: fetchToman, refetchInterval: 3 * 60 * 1000 })

    const favoriteHandler = () => {
        isFavorite("bitcoin")
        if (favorite) {
            removeFromFav(params.id)
            setFavorite(!favorite)
        } else {
            addToFav(params.id)
            setFavorite(!favorite)
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
                    <div onClick={favoriteHandler}>{favorite ? <TiStarFullOutline size={30} color="#F7D001" /> : <TiStarOutline size={30} />}</div>
                </div>
                <div className={styles.coinDetails}>
                    <table className={styles.coinDetailsTable}>
                        <tbody>
                            <tr>
                                <td>${data.data.market_data.current_price.usd.toLocaleString()}</td>
                                {tomanIsLoading ? <td><Skeleton width={170} height={21} /></td> :
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
                <CoinChart coinId={params.id} />
            </div>
        )
    }
}

export default CoinDetails
