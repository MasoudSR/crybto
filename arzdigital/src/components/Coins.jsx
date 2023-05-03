import React, { useEffect, useState } from "react";
import axios from "axios";

import Coin from "./Coin";
import styles from "./Coins.module.css"

const Coins = () => {
    const [coinsData, setCoinsData] = useState([]);

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en"
            )
            .then((res) => {
                setCoinsData(res.data);
            });
    }, []);

    return (
        <div>
            {coinsData.map((coinData) =>
                <Coin
                    key={coinData.id}
                    id={coinData.id}
                    name={coinData.name}
                    image={coinData.image}
                    currentPrice={coinData.current_price}
                />
            )}
        </div>
    );
};

export default Coins;
