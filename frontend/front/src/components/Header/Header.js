import styles from "./Header.module.css"
import React from 'react'


const Header=()=> {
    return(
        <div className={styles.container}>
            <h1 className={styles.headline}>Звериный блог :{')'}</h1>
            <div className={styles.buttons}>
                <button className={styles.newPost}>Новый пост</button>
                <button className={styles.logOut}>Выход</button>
            </div>
        </div> 
    );
}

export default Header;