import styles from "./PageButtons.module.css"

const PageButtons = ({ pageNumber, setPageNumber }) => {
    return (
        <div className={styles.container} >
            <button disabled={pageNumber == 1 && true} onClick={() => { setPageNumber(pageNumber - 1) }}>back</button>

            {pageNumber > 3 && <h2 onClick={() => { setPageNumber(1) }} className={styles.pageNumber}>1</h2>}
            {pageNumber > 3 && <h2>...</h2>}
            {pageNumber > 2 && <h2 onClick={() => { setPageNumber(pageNumber - 2) }} className={styles.pageNumber}>{pageNumber - 2}</h2>}
            {pageNumber > 1 && <h2 onClick={() => { setPageNumber(pageNumber - 1) }} className={styles.pageNumber}>{pageNumber - 1}</h2>}

            {!pageNumber == 1 && <h2 className={styles.pageNumber}>1</h2>}
            <h2 className={styles.currentPage}>{pageNumber}</h2>
            <h2 onClick={() => { setPageNumber(pageNumber + 1) }} className={styles.pageNumber}>{pageNumber + 1}</h2>
            <h2 onClick={() => { setPageNumber(pageNumber + 2) }} className={styles.pageNumber}>{pageNumber + 2}</h2>
            <h2>...</h2>
            <h2 onClick={() => { setPageNumber(pageNumber + 5) }} className={styles.pageNumber}>{pageNumber + 5}</h2>

            <button onClick={() => { setPageNumber(pageNumber + 1) }}>next</button>
        </div>
    );
};

export default PageButtons;