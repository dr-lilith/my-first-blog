import styles from "./Login.module.css"
import React, { useState } from 'react'


const Login=( { postData })=> {
    const [isSaved, setIsSaved] = useState(false)
    const savedHandler = ()=>{
        setIsSaved(true)
    }
    return(
        <div className={styles.Login}>
            <h1 className={styles.LoginHeadline}>Вход</h1>
            <input placeholder="Введите email" className={styles.headlineInput}/>
            <input placeholder="Введите пароль" className={styles.headlineInput}/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={savedHandler}>{!isSaved ? 'Войти':'Вход...'}</button>
            </p>
        </div> 

    );
}

export default Login;