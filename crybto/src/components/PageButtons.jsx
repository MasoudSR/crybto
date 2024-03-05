import styles from "./PageButtons.module.css"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { PiDotsThreeOutlineThin } from "react-icons/pi";



const PageButtons = ({ pageNumber, setPageNumber, lastPage }) => {
    return (
        <div className={styles.container} >
            <button className={styles.pageNumber} disabled={pageNumber == 1 && true} onClick={() => { setPageNumber(pageNumber - 1) }}><MdKeyboardArrowLeft size={20} /></button>

            {pageNumber > 1 && <button onClick={() => { setPageNumber(1) }} className={styles.pageNumber}>1</button>}
            {pageNumber > 2 && <h2 className={styles.threeDots}><PiDotsThreeOutlineThin /></h2>}
            {pageNumber == lastPage && lastPage - 2 > 1 && <button onClick={() => { setPageNumber(pageNumber - 2) }} className={styles.pageNumber}>{pageNumber - 2}</button>}
            {pageNumber > lastPage - 2 && lastPage - 2 > 1 && <button onClick={() => { setPageNumber(pageNumber - 1) }} className={styles.pageNumber}>{pageNumber - 1}</button>}

            <button className={styles.currentPage}>{pageNumber}</button>
            {pageNumber < lastPage && <button onClick={() => { setPageNumber(pageNumber + 1) }} className={styles.pageNumber}>{pageNumber + 1}</button>}
            {pageNumber < lastPage - 1 && <button onClick={() => { setPageNumber(pageNumber + 2) }} className={styles.pageNumber}>{pageNumber + 2}</button>}

            {pageNumber <= 2 && lastPage - 2 > 1 && <button onClick={() => { setPageNumber(pageNumber + 3) }} className={styles.pageNumber}>{pageNumber + 3}</button>}
            {pageNumber == 1 && lastPage - 2 > 1 && <button onClick={() => { setPageNumber(pageNumber + 4) }} className={styles.pageNumber}>{pageNumber + 4}</button>}

            <button className={styles.pageNumber} disabled={pageNumber == lastPage && true} onClick={() => { setPageNumber(pageNumber + 1) }}><MdKeyboardArrowRight size={20} /></button>
        </div>
    );
};

export default PageButtons;