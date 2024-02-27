import styles from "./PageButtons.module.css"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { PiDotsThreeOutlineThin } from "react-icons/pi";



const PageButtons = ({ pageNumber, setPageNumber }) => {
    return (
        <div className={styles.container} >
            <button className={styles.pageNumber} disabled={pageNumber == 1 && true} onClick={() => { setPageNumber(pageNumber - 1) }}><MdKeyboardArrowLeft size={20} /></button>

            {pageNumber > 1 && <button onClick={() => { setPageNumber(1) }} className={styles.pageNumber}>1</button>}
            {pageNumber > 2 && <h2 className={styles.threeDots}><PiDotsThreeOutlineThin /></h2>}
            <button className={styles.currentPage}>{pageNumber}</button>
            <button onClick={() => { setPageNumber(pageNumber + 1) }} className={styles.pageNumber}>{pageNumber + 1}</button>
            <button onClick={() => { setPageNumber(pageNumber + 2) }} className={styles.pageNumber}>{pageNumber + 2}</button>

            <button className={styles.pageNumber} onClick={() => { setPageNumber(pageNumber + 1) }}><MdKeyboardArrowRight size={20} /></button>
        </div>
    );
};

export default PageButtons;