import Skeleton from "react-loading-skeleton"
import styles from "../modules/CoinSearchTile.module.css"

function CoinSearching() {
    return (
        <>
            <div className={styles.container}>
                <Skeleton width={25} height={25} />
                <Skeleton width={75} /> (<Skeleton width={30} />)
            </div>
            <div className={styles.container}>
                <Skeleton width={25} height={25} />
                <Skeleton width={75} /> (<Skeleton width={30} />)
            </div>
            <div className={styles.container}>
                <Skeleton width={25} height={25} />
                <Skeleton width={75} /> (<Skeleton width={30} />)
            </div>
            <div className={styles.container}>
                <Skeleton width={25} height={25} />
                <Skeleton width={75} /> (<Skeleton width={30} />)
            </div>
            <div className={styles.container}>
                <Skeleton width={25} height={25} />
                <Skeleton width={75} /> (<Skeleton width={30} />)
            </div>
        </>
    )
}

export default CoinSearching