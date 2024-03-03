import { Link } from "react-router-dom"
import styles from "./CoinSearchTile.module.css"


function CoinSearchTile({ coin }) {
    return (
        <Link to={coin.id} className={styles.container}>
            <img src={coin.thumb} alt={coin.symbol} />
            {coin.name} ({coin.symbol})
        </Link>
    )
}

export default CoinSearchTile