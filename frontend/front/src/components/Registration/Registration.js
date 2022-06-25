import styles from "./Registration.module.css"
import React, { useState } from 'react'


const Registration=( { postData })=> {
    const [isSaved, setIsSaved] = useState(false)
    const savedHandler = ()=>{
        setIsSaved(true)
    }
    return(
        <div className={styles.Registration}>
            <h1 className={styles.RegistrationHeadline}>Регистрация нового пользователя</h1>
            <input placeholder="Введите email" className={styles.headlineInput}/>
            <input placeholder="Придумайте уникальное имя пользователя" className={styles.headlineInput}/>
            <input placeholder="Придумайте пароль" className={styles.headlineInput}/>
            <input placeholder="Повторите пароль" className={styles.headlineInput}/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={savedHandler}>{!isSaved ? 'Coхранить':'Сохранено'}</button>
            </p>
        </div> 

    );
}

export default Registration;
