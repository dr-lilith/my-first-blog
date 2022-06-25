import styles from "./Comment.module.css"
import React, { useState } from 'react'


const Comment=()=> {
    const [isSaved, setIsSaved] = useState(false)
    const savedHandler = ()=>{
        setIsSaved(true)
    }
    return(
        <div className={styles.Comment}>
            <textarea rows="20" cols="120" name="textArea" className={styles.commentTextarea} placeholder='Оставьте комментарий'/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={savedHandler}>{!isSaved ? 'Coхранить комментарий':'Сохранено'}</button>
            </p>
        </div> 

    );
}

export default Comment;