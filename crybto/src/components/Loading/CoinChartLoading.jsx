import styles from "../CoinChart.module.css"
import Skeleton from 'react-loading-skeleton'


function CoinChartLoading() {
    return (
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
    )
}

export default CoinChartLoading