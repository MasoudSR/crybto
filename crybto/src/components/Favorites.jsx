// Hooks 
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Components 
import Coin from "./Coin";
import CoinLoading from "./Loading/CoinLoading";
import { TiStarOutline } from "react-icons/ti";
// import PageButtons from "./PageButtons";

// Other 
import styles from "./Coins.module.css"
import { getFavorites } from "../helper/favoritesManager";


const Favorites = () => {
  // const [pageNumber, setPageNumber] = useState(1)
  const [favorites] = useState(getFavorites)
  const api = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${favorites.toString()}&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en&x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`

  const fetchCoins = () => axios.get(api)

  const { data, isLoading, isError, error } = useQuery({ queryKey: ["coins", favorites], queryFn: fetchCoins, refetchInterval: 3 * 60 * 1000 })

  if (!favorites.length) {
    return <p className={styles.alert}>
      <h4>You Have No Favorite Coin </h4>
      <p>use <TiStarOutline /> icon to add coin in favorites</p>
    </p>
  } else return (
    <div className={styles.container}>
      {isError && (<p className={styles.alert}>{error.message}<p>Please try again later</p></p>)}
      <div className={styles.coinsContainer}>
        {isLoading && <CoinLoading />}
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
      {/* <PageButtons pageNumber={pageNumber} setPageNumber={setPageNumber} /> */}
    </div>
  );
};

export default Favorites;
