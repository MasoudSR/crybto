import React from 'react';

import styles from "./PageButtons.module.css"

const PageButtons = ({ pageNumber, setPageNumber }) => {
    return (
        <div className={styles.container} >
            {pageNumber > 1 && <button onClick={() => { setPageNumber(pageNumber - 1) }}>back</button>}
            <h2>{pageNumber}</h2>
            <button onClick={() => { setPageNumber(pageNumber + 1) }}>next</button>
        </div>
    );
};

export default PageButtons;