import styles from "./NewPost.module.css"
import React, { useState } from 'react'
import TagInputComponent from "./TagInputComponent/TagInputComponent"
import ImageUploader from "./ImageUploader/ImageUploader"
import { useNavigate } from 'react-router-dom'
import { httpPost } from "../utils/httpClient";
import AvatarUploader from "../UserProfile/AvatarUploader/AvatarUploader"


const NewPost=( { postData })=> {
    const [isSaved, setIsSaved] = useState(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [savedPostData, setSavedPostData] = useState(false);
    const [selectedFile, setSelectedFile] = useState('');
    const [tags, setTags] = React.useState([
        { id: 'Thailand', text: 'Thailand' },
        { id: 'India', text: 'India' },
        { id: 'Vietnam', text: 'Vietnam' },
        { id: 'Turkey', text: 'Turkey' },
      ]);
    const navigate = useNavigate()

   
    const submitHandler = ()=>{
        console.log(title, text)
        setIsSaved(true);
        let data = { "title": title, "text": text }
        if (!savedPostData){
            httpPost("/posts/create", data)
            .then(setSavedPostData)
            .then(setIsSaved(true))
            
        }
        if (selectedFile){
            console.log(selectedFile, 'selectedFile');
            httpPost(`/posts/${savedPostData.id}/upload_post_photo_from_url`, selectedFile.name)
            .then(res=>console.log(res))
            
        }
        
    }
    console.log(tags);
    return(
        <div className={styles.PostEditor}>
            <h1 className={styles.CreateNewPost}>Создание нового поста:</h1>
            <input placeholder="Заголовок поста" className={styles.headlineInput} onChange={event => setTitle(event.target.value)}/>
            <textarea rows="20" cols="120" name="textArea" className={styles.postTextarea} placeholder='Текст поста' onChange={event => setText(event.target.value)}/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={submitHandler}>{!isSaved ? 'Coхранить новый пост':'Сохранено'}</button>
            </p>
            {isSaved && <h2 className={styles.CreateNewPost}>К своему посту Вы также можете:</h2>}
            {isSaved && <AvatarUploader oldImage={undefined} url={`/posts/${savedPostData.id}/upload_post_photo`}/>}
            {isSaved && <TagInputComponent tags={tags} setTags={setTags}/>}
            {isSaved && <button className={styles.btn} onClick={submitHandler}>{'Coхранить изменения'}</button>}

        </div> 

    );
}

export default NewPost;
