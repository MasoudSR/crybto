import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import CoinSearchTile from "./modules/CoinSearchTile"
import styles from "./Search.module.css"
import CoinSearching from "./Loading/CoinSearching"
import { DebounceInput } from "react-debounce-input"


function Search({ searchBar }) {
    const [search, setSearch] = useState("")

    const fetchSearchedCoin = () => axios.get(`https://api.coingecko.com/api/v3/search?query=${search}`)
    const { data, isLoading, isError } = useQuery({ queryKey: ["searchedCoins", search], queryFn: fetchSearchedCoin, refetchOnMount: false, refetchOnWindowFocus: false, enabled: search.length > 0, staleTime: 5 * 60 * 1000 })

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }


    return (
        <div className={styles.container}>
            <DebounceInput placeholder={"Search"} debounceTimeout={800} onChange={searchHandler} className={styles.searchBox} />
            {searchBar &&
                <div className={styles.searchResults}>
                    {isError && <p className={styles.resultTile}>Error in receiving data, try again</p>}
                    {isLoading && <CoinSearching />}
                    {search.length > 0 && data && data.data.coins.length === 0 && <p className={styles.resultTile}>Coin not found</p>}
                    {search.length > 0 && data && data.data.coins.slice(0, 5).map(coin => <CoinSearchTile key={coin.id} coin={coin} />)}
                </div>
            }
        </div>
    )
}

export default Search