import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CoinDetails.module.css"

const CoinDetails = () => {
    const [coinData, setCoinData] = useState({});
    const params = useParams();
    const [error, setError] = useState("")

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`)
            .then((res) => {
                setCoinData(res.data);
            }).catch(err => {
                setError(err)
            })
    }
        , []
    )

    if (Object.keys(coinData).length == 0) {
        return (!error ? <h1 className={styles.alert}>Loading</h1> : <h1 className={styles.alert}>${error.message}</h1>)
    } else {
        return (
            <div className={styles.container}>
                <img src={coinData.image.large} alt={coinData.name} />
                <h1>{coinData.name}</h1>
                <h1>Price:{coinData.market_data.current_price.usd.toLocaleString()}$</h1>
                <h3>Last Update:{coinData.last_updated}</h3>
                <p dangerouslySetInnerHTML={{ __html: coinData.description.en }}></p>
                <a href={coinData.links.homepage}>{coinData.links.homepage}</a>
            </div>
        )
    };
}

export default CoinDetails
