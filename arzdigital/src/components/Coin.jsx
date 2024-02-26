import { Link } from 'react-router-dom';

import styles from "./Coin.module.css";

const Coin = ({ id, symbol, name, image, currentPrice, priceChange }) => {
    return (
        <Link to={id} className={styles.coinContainer}>
            <div className={styles.coinLogo}>
                <img src={image} alt={name} />
                <h1>{symbol.toUpperCase()}</h1>
            </div>
            <h1 className={styles.item}>{name}</h1>
            <h1 className={`${styles.item} ${priceChange >= 0 ? styles.green : styles.red}`}>{priceChange}%</h1>
            <h1 className={styles.item}>${currentPrice.toLocaleString()}</h1>
        </Link>
    );
};

export default Coin;
