import { Link } from 'react-router-dom';

import styles from "./Coin.module.css";

const Coin = ({ id, symbol, name, image, currentPrice, priceChange }) => {
    return (
        <Link to={id} className={styles.coinContainer}>
            <div className={styles.coinName}>
                <div className={styles.coinLogos}>
                    <img src={image} alt={name} />
                    <h2 className={styles.symbol}>({symbol.toUpperCase()})</h2>
                </div>
                <h1>{name}</h1>
            </div>
            <h1 className={styles.price}>${currentPrice < 1000 ? currentPrice : currentPrice.toLocaleString()}</h1>
            <h1 className={`${styles.percentage} ${priceChange >= 0 ? styles.green : styles.red}`}> {priceChange >= 0 ? <span className={styles.triangleUp} /> : <span className={styles.triangleDown} />}  {priceChange.toFixed(2)}%</h1>
        </Link>
    );
};

export default Coin;
