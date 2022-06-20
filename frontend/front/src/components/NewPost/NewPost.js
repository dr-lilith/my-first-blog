import styles from "./NewPost.module.css"
import React, { useState } from 'react'
import TagInputComponent from "./TagInputComponent/TagInputComponent"
import ImageUploader from "./ImageUploader/ImageUploader"


const NewPost=( { postData })=> {
    const [isSaved, setIsSaved] = useState(false)
    const savedHandler = ()=>{
        setIsSaved(true)
    }
    return(
        <div className={styles.PostEditor}>
            <h1 className={styles.CreateNewPost}>Создание нового поста:</h1>
            <input placeholder="Заголовок поста" className={styles.headlineInput}/>
            <textarea rows="20" cols="120" name="textArea" className={styles.postTextarea} placeholder='Текст поста'/>
            <ImageUploader/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={savedHandler}>{!isSaved ? 'Coхранить новый пост':'Сохранено'}</button>
            </p>
            {isSaved && <TagInputComponent/>}
        </div> 

    );
}

export default NewPost;