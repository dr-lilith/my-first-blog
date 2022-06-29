import styles from "./NewPost.module.css"
import React, { useState } from 'react'
import TagInputComponent from "./TagInputComponent/TagInputComponent"
import ImageUploader from "./ImageUploader/ImageUploader"
import { useNavigate } from 'react-router-dom'
import { httpPost } from "../utils/httpClient";


const NewPost=( { postData })=> {
    const [isSaved, setIsSaved] = useState(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [savedPostData, setSavedPostData] = useState(false)
    const navigate = useNavigate()

    const submitHandler = ()=>{
        console.log(title, text)
        setIsSaved(true);
        let data = { "title": title, "text": text }
        if (!savedPostData){
            console.log('hii')
            httpPost("/posts/create", data)
            .then(setSavedPostData)
            .then(setIsSaved(true))
        }
        
    }
    console.log(savedPostData)
    // .then(console.log(savedPostData))

    return(
        <div className={styles.PostEditor}>
            <h1 className={styles.CreateNewPost}>Создание нового поста:</h1>
            <input placeholder="Заголовок поста" className={styles.headlineInput} onChange={event => setTitle(event.target.value)}/>
            <textarea rows="20" cols="120" name="textArea" className={styles.postTextarea} placeholder='Текст поста' onChange={event => setText(event.target.value)}/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={submitHandler}>{!isSaved ? 'Coхранить новый пост':'Сохранено'}</button>
            </p>
            {isSaved && <h2 className={styles.CreateNewPost}>К своему посту Вы также можете:</h2>}
            {isSaved && <ImageUploader/>}
            {isSaved && <TagInputComponent/>}
            {isSaved && <button className={styles.btn} onClick={submitHandler}>{'Coхранить изменения'}</button>}

        </div> 

    );
}

export default NewPost;
