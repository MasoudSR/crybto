import React from 'react';

import { Link } from 'react-router-dom';

import styles from "./Coin.module.css";

const Coin = ({ id, name, image, currentPrice }) => {
    return (
        <Link to={id} className={styles.coinContainer}>
            <img src={image} alt={name} />
            <h1>{name}</h1>
            <h1>{currentPrice}$</h1>
        </Link>
    );
};

export default Coin;
