import { Link } from "react-router-dom"
import styles from "../CoinDetails.module.css"
import Skeleton from 'react-loading-skeleton'
import { MdArrowBack } from "react-icons/md"

const CoinDetailsLoading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link to={"/"}>
                    <MdArrowBack size={30} />
                </Link>
                <Skeleton width={61} height={61} />
                <h1><Skeleton width={130} height={40} /></h1>
                <h1></h1>
            </div>
            <div className={styles.coinDetails}>
                <table className={styles.coinDetailsTable}>
                    <tbody>
                        <tr>
                            <td><Skeleton width={100} height={21} /></td>
                            <td><Skeleton width={170} height={21} /></td>
                        </tr>
                        <tr>
                            <td>Last Update</td>
                            <td><Skeleton width={200} height={19} /></td>
                        </tr>
                        <tr>
                            <td>Market cap rank</td>
                            <td><Skeleton width={20} height={19} /></td>
                        </tr>
                        <tr>
                            <td>Market cap</td>
                            <td><Skeleton width={180} height={19} /></td>
                        </tr>
                        <tr>
                            <td>Total volume</td>
                            <td><Skeleton width={170} height={19} /></td>
                        </tr>
                        <tr>
                            <td>Lowest in 24 hours</td>
                            <td><Skeleton width={100} height={19} /></td>
                        </tr>
                        <tr>
                            <td>Price change in 24 hours</td>
                            <td><Skeleton width={110} height={19} /></td>
                        </tr>
                        <tr>
                            <td>Highest in 24 hours</td>
                            <td><Skeleton width={100} height={19} /></td>
                        </tr>
                        <tr>
                            <td>Price change in 24 hours</td>
                            <td><Skeleton width={120} height={19} /></td>
                        </tr>
                        <tr>
                            <td>Price change in 7 days</td>
                            <td><Skeleton width={120} height={19} /></td>
                        </tr>
                        <tr>
                            <td>Price change in 30 days</td>
                            <td><Skeleton width={120} height={19} /></td>
                        </tr>
                        <tr>
                            <td>Price change in 1 year</td>
                            <td><Skeleton width={120} height={19} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartHeader}>
                    <h2>Price Changes Chart</h2>
                    <div className={styles.chartButtons}>
                        <Skeleton width={80} height={22} />
                        <Skeleton width={80} height={22} />
                        <Skeleton width={80} height={22} />
                        <Skeleton width={80} height={22} />
                        <Skeleton width={80} height={22} />
                    </div>
                </div>
                <Skeleton height={400} />
            </div>
        </div>
    )
}

export default CoinDetailsLoading
