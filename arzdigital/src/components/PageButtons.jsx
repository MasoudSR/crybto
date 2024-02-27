import styles from "./PageButtons.module.css"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { PiDotsThreeOutlineThin } from "react-icons/pi";



const PageButtons = ({ pageNumber, setPageNumber }) => {
    return (
        <div className={styles.container} >
            <button className={styles.pageNumber} disabled={pageNumber == 1 && true} onClick={() => { setPageNumber(pageNumber - 1) }}><MdKeyboardArrowLeft size={20} /></button>

            {pageNumber > 3 && <h2 onClick={() => { setPageNumber(1) }} className={styles.pageNumber}>1</h2>}
            {pageNumber > 3 && <h2 className={styles.threeDots}><PiDotsThreeOutlineThin /></h2>}
            {pageNumber > 2 && <h2 onClick={() => { setPageNumber(pageNumber - 2) }} className={styles.pageNumber}>{pageNumber - 2}</h2>}
            {pageNumber > 1 && <h2 onClick={() => { setPageNumber(pageNumber - 1) }} className={styles.pageNumber}>{pageNumber - 1}</h2>}
            {!pageNumber == 1 && <h2 className={styles.pageNumber}>1</h2>}
            <h2 className={styles.currentPage}>{pageNumber}</h2>
            <h2 onClick={() => { setPageNumber(pageNumber + 1) }} className={styles.pageNumber}>{pageNumber + 1}</h2>
            <h2 onClick={() => { setPageNumber(pageNumber + 2) }} className={styles.pageNumber}>{pageNumber + 2}</h2>
            <h2 className={styles.threeDots}><PiDotsThreeOutlineThin /></h2>
            <h2 onClick={() => { setPageNumber(pageNumber + 5) }} className={styles.pageNumber}>{pageNumber + 5}</h2>

            <button className={styles.pageNumber} onClick={() => { setPageNumber(pageNumber + 1) }}><MdKeyboardArrowRight size={20} /></button>
        </div>
    );
};

export default PageButtons;