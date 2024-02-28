import styles from "../CoinDetails.module.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CoinDetailsLoading = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Skeleton width={55} height={55} />
                <h1><Skeleton width={130} height={40} /></h1>
                <h1></h1>
            </div>
            <div className={styles.coinDetails}>
                <table className={styles.coinDetailsTable}>
                    <tbody>
                        <tr>
                            <td><Skeleton width={100} height={22} /></td>
                            <td><Skeleton width={170} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={120} height={22} /></td>
                            <td><Skeleton width={200} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={140} height={22} /></td>
                            <td><Skeleton width={20} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={110} height={22} /></td>
                            <td><Skeleton width={180} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={120} height={22} /></td>
                            <td><Skeleton width={170} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={150} height={22} /></td>
                            <td><Skeleton width={100} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={170} height={22} /></td>
                            <td><Skeleton width={110} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={150} height={22} /></td>
                            <td><Skeleton width={100} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={170} height={22} /></td>
                            <td><Skeleton width={120} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={160} height={22} /></td>
                            <td><Skeleton width={120} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={165} height={22} /></td>
                            <td><Skeleton width={120} height={22} /></td>
                        </tr>
                        <tr>
                            <td><Skeleton width={160} height={22} /></td>
                            <td><Skeleton width={120} height={22} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartLoading} />
            </div>
        </div>
    )
}

export default CoinDetailsLoading
