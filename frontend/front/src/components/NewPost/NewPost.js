import styles from "./NewPost.module.css"
import React, { useState } from 'react'
import TagInputComponent from "./TagInputComponent/TagInputComponent"
import { useNavigate } from 'react-router-dom'
import { httpPost } from "../utils/httpClient";
import AvatarUploader from "../UserProfile/AvatarUploader/AvatarUploader"


const NewPost=({post})=> {
    const [isSaved, setIsSaved] = useState(false)
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [savedPostData, setSavedPostData] = useState(false);
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
        if (!savedPostData && !post?.id){
            httpPost("/posts/create", data)
            .then(setSavedPostData)
            .then(setIsSaved(true))
            
        }
        if (!savedPostData && post?.id){
            httpPost(`/posts/${post.id}/edit`, data)
            .then(setSavedPostData)
            .then(setIsSaved(true))   
        }
    }
    console.log(tags);
    return(
        <div className={styles.PostEditor}>
            <h1 className={styles.CreateNewPost}>Редактор поста:</h1>
            <h1>
                {post?.id 
                  ?<input value={post.title} className={styles.editpostHeadline} onChange={event => setTitle(event.target.value)} placeholder='Введите заголовок поста'/>
                  :<input placeholder="Заголовок поста" className={styles.headlineInput} onChange={event => setTitle(event.target.value)}/>}
            </h1>
            <p>  
                {post?.id 
                  ?<textarea value={post.text} className={styles.editpostText} onChange={event => setText(event.target.value)} placeholder='Введите текст поста'/>
                  :<textarea rows="20" cols="120" name="textArea" className={styles.postTextarea} placeholder='Текст поста' onChange={event => setText(event.target.value)}/>}
            </p>
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
