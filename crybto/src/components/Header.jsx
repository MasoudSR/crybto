import styles from './Header.module.css';

const Header = () => {
    return (
        <div className={styles.container}>
            <img src="./logo.png" alt="CRYBTO" title="Crybto" />
            <div className={styles.description}>Cryptocurrency Price Board</div>
        </div>
    );
};

export default Header;