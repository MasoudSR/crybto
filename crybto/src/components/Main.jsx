// Hooks
import { useState } from "react"

// Components
import Coins from './Coins'
import Search from "./Search";
import Favorites from "./Favorites";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";

// Other
import styles from "./Main.module.css"


function Main() {
    const [pageName, setPageName] = useState("all")
    const [searchBar, setSearchBar] = useState(false)

    return (
        <div className={styles.container}>
            <div className={`${styles.header} ${searchBar && styles.activeSearch}`}>
                <div className={styles.headerButtons}>
                    <div className={pageName == "all" ? styles.btnActive : undefined} onClick={() => { setPageName("all") }}>All Coins</div>
                    <div className={pageName == "fav" ? styles.btnActive : undefined} onClick={() => { setPageName("fav") }}>Favorites</div>
                    <div onClick={() => { setSearchBar(!searchBar) }}>
                        <BiSearchAlt2 size={20} className={`${styles.icon} ${searchBar ? styles.inActiveSearchIcon : undefined}`} />
                        <IoIosArrowUp size={20} className={`${styles.icon} ${!searchBar ? styles.inActiveArrowIcon : undefined}`} />
                    </div>
                </div>
                <div className={styles.searchBox}>
                    {<Search searchBar={searchBar} />}
                </div>
            </div>

            {pageName == "all" && <Coins />}
            {pageName == "fav" && <Favorites />}
        </div>
    )
}

export default Main