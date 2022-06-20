import styles from "./NewPost.module.css"
import React, { useState } from 'react'
import TagInput from "./TagInput/TagInput"


const NewPost=( { postData })=> {
    const [isSaved, setIsSaved] = useState(false)
    const savedHandler = ()=>{
        setIsSaved(true)
    }
    const imageHandler = e=>{
        // e.preventDefault()
        const file = e.target.files[0]
        const reader = new FileReader()
        console.log(reader)
        reader.onload =()=> {console.log('success')}
    }
    return(
        <div className={styles.PostEditor}>
            <h1 className={styles.CreateNewPost}>Создание нового поста:</h1>
            <input placeholder="Заголовок поста" className={styles.headlineInput}/>
            <textarea rows="20" cols="120" name="textArea" className={styles.postTextarea} placeholder='Текст поста'/>
            <input placeholder="Загрузите картинку" type='file' onClick={imageHandler}/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={savedHandler}>{!isSaved ? 'Coхранить новый пост':'Сохранено'}</button>
            </p>
            {isSaved && <TagInput/>}
        </div> 

    );
}

export default NewPost;