import styles from "./Footer.module.css"
import React from 'react'


const Footer=()=> {
    return(
        <div className={styles.container}>
            <h3 className={styles.headline}>Все права сохранены ©. 2022 </h3>
        </div> 
    );
}

export default Footer;
