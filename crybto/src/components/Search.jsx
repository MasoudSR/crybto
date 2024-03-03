import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import CoinSearchTile from "./modules/CoinSearchTile"
import styles from "./Search.module.css"
import CoinSearching from "./Loading/CoinSearching"


function Search({ searchBar }) {
    const [search, setSearch] = useState("")

    const fetchSearchedCoin = () => axios.get(`https://api.coingecko.com/api/v3/search?query=${search}`)
    const { data, isFetching, isError, refetch } = useQuery({ queryKey: ["searchedCoins", search], queryFn: fetchSearchedCoin, enabled: false, refetchOnMount: false, refetchOnWindowFocus: false })

    const searchHandler = (e) => {
        setTimeout(refetch, 400)
        setSearch(e.target.value)
    }


    return (
        <div className={styles.container}>
            <input type="text" value={search} onChange={searchHandler} placeholder="Search" className={styles.searchBox} />
            <div className={styles.searchResults}>
                {isError && <p className={styles.resultTile}>Error in receiving data, try again</p>}
                {isFetching && <CoinSearching />}
                {data && data.data.coins.length === 0 && <p className={styles.resultTile}>Coin not found</p>}
                {search.length > 0 && searchBar && data && data.data.coins.slice(0, 5).map(coin => <CoinSearchTile key={coin.id} coin={coin} />)}
            </div>
        </div>
    )
}

export default Search