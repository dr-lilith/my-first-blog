import styles from "./EditProfile.module.css"
import React, { useState } from 'react'


const EditProfile=( { postData })=> {
    const [isSaved, setIsSaved] = useState(false)
    const savedHandler = ()=>{
        setIsSaved(true)
    }
    return(
        <div className={styles.Login}>
            <h1 className={styles.LoginHeadline}>Редактирование профиля</h1>
            <input placeholder="Имя" className={styles.headlineInput}/>
            <input placeholder="Фамилия" className={styles.headlineInput}/>
            <textarea rows="20" cols="120" name="textArea" className={styles.postTextarea} placeholder='О себе'/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={savedHandler}>{!isSaved ? 'Сохранить':'Сохранение...'}</button>
            </p>
        </div> 
    );
}

export default EditProfile;