import { useState } from "react";
import axios from "axios";

import Coin from "./Coin";
import styles from "./Coins.module.css"
import PageButtons from "./PageButtons";
import { useQuery } from "@tanstack/react-query";

const Coins = () => {
    const [pageNumber, setPageNumber] = useState(1)

    const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageNumber}&sparkline=false&locale=en&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`

    const fetchCoins = () => axios.get(api)

    const { data, isLoading, isError, error } = useQuery({ queryKey: ["coins", pageNumber], queryFn: fetchCoins })

    return (
        <>
            {isLoading && <h1 className={styles.alert}>Loading...</h1>}
            {isError && (<h1 className={styles.alert}>{error.message}<p>Please try again later</p></h1>)}
            <div className={styles.container}>
                <div className={styles.coinsHeader}>
                    <h2 className={styles.item}>Coin</h2>
                    <h2 className={styles.item}>Name</h2>
                    <h2 className={styles.item}>24H Change</h2>
                    <h2 className={styles.item}>Price</h2>
                </div>
                <div className={styles.coinsContainer}>
                    {data?.data.map((coinData) =>
                        <Coin
                            key={coinData.id}
                            id={coinData.id}
                            symbol={coinData.symbol}
                            name={coinData.name}
                            image={coinData.image}
                            currentPrice={coinData.current_price}
                            priceChange={coinData.price_change_percentage_24h}
                        />
                    )}
                </div>
                <PageButtons pageNumber={pageNumber} setPageNumber={setPageNumber} />
            </div>
        </>
    );
};

export default Coins;
