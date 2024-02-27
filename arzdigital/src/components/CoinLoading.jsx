import styles from "./Coin.module.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function CoinLoading() {

  let LoadingComponent = []

  for (let i = 0; i < 10; i++) {
    LoadingComponent.push(
      <a className={styles.coinContainer}>
        <div className={styles.coinName}>
          <div className={styles.coinLogos}>
            <Skeleton width={20} height={15} />
            <h2 className={styles.symbol}><Skeleton width={30} height={10} /></h2>
          </div>
          <h1 className={styles.loading}><Skeleton width={90} /></h1>
        </div>
        <h1 className={styles.price}><Skeleton width={100} /></h1>
        <h1 className={styles.percentage}><Skeleton width={80} /></h1>
      </a>
    )
  }

  return (<>{LoadingComponent}</>)
}

export default CoinLoading