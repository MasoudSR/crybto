import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className={styles.container}>
            <Link to="/">
                ArzDigital
            </Link>
        </div>
    );
};

export default Header;