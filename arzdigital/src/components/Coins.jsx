import React, { useEffect, useState } from "react";
import axios from "axios";

import Coin from "./Coin";
import styles from "./Coins.module.css"
import PageButtons from "./PageButtons";

const Coins = () => {
    const [coinsData, setCoinsData] = useState([]);
    const [error, setError] = useState("")
    const [pageNumber , setPageNumber] = useState(1)

    useEffect(() => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageNumber}&sparkline=false&locale=en`
            )
            .then((res) => {
                setCoinsData(res.data);
            }).catch(error => {
                setError(error)
            });
    }, [pageNumber]);

    return (
        <div className={styles.container}>
            {coinsData.length == 0 && !error && <h1 className={styles.alert}>Loading...</h1>}
            {error && (<h1 className={styles.alert}>{error.message}<p>Please try again later</p></h1>)}

            {coinsData.map((coinData) =>
                <Coin
                    key={coinData.id}
                    id={coinData.id}
                    name={coinData.name}
                    image={coinData.image}
                    currentPrice={coinData.current_price}
                />
            )}
            <PageButtons pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
    );
};

export default Coins;
