import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./CoinDetails.module.css"
import { useQuery } from "@tanstack/react-query";

const CoinDetails = () => {
    const params = useParams();

    const fetchCoin = () => axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`)

    const { data, error, isError, isLoading } = useQuery({ queryKey: ["coin", params.id], queryFn: fetchCoin })
    
    if (isLoading) {
        <h1 className={styles.alert}>Loading</h1>
    }else if (isError) {
        <h1 className={styles.alert}>${error.message}</h1>
    }else{
    return (
            <div className={styles.container}>
                <img src={data.data.image.large} alt={data.data.name} />
                <h1>{data.data.name}</h1>
                <h1>Price:{data.data.market_data.current_price.usd.toLocaleString()}$</h1>
                <h3>Last Update:{data.data.last_updated}</h3>
                <p dangerouslySetInnerHTML={{ __html: data.data.description.en }}></p>
                <a href={data.data.links.homepage}>{data.data.links.homepage}</a>
            </div>      
    )}
}

export default CoinDetails
