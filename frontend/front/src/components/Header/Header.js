import styles from "./Header.module.css"
import React from 'react'
import { NavLink } from "react-router-dom";


const Header=()=> {
    return(
        <div className={styles.container}>
            <h1 className={styles.headline}>Звериный блог :{')'}</h1>
            <div className={styles.buttons}>
                <NavLink to='/'><button className={styles.btn}>Лента</button></NavLink>
                <NavLink to='/new-post'><button className={styles.btn}>Новый пост</button></NavLink>
                <NavLink to='/user-profile'><button className={styles.btn}>Мой профиль</button></NavLink>
                <button className={styles.btn}>Выход</button>
            </div>
        </div> 
    );
}

export default Header;