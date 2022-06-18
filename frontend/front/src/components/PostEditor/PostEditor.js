import styles from "./PostEditor.module.css"
import React, { useState } from 'react'


const PostEditor=( { postData })=> {
    const [isSaved, setIsSaved] = useState(false)
    const savedHandler = ()=>{
        setIsSaved(true)
    }
    return(
        <div className={styles.PostEditor}>
            <h1 className={styles.CreateNewPost}>Создание нового поста:</h1>
            <input placeholder="Заголовок поста" className={styles.headlineInput}/>
            <textarea rows="20" cols="120" name="textArea" className={styles.postTextarea} placeholder='Текст поста'/>
            <input placeholder="Загрузите картинку" type='file' onClick={(e)=>console.log(e.target.value)}/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={savedHandler}>{!isSaved ? 'Coхранить новый пост':'Сохранено'}</button>
            </p>
            {isSaved && <input placeholder="добавление тегов"/>}
        </div> 

    );
}

export default PostEditor;