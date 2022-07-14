import styles from "./NewPost.module.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { httpPost } from "../utils/httpClient";
import { useDispatch } from 'react-redux';
import { postsActions } from '../../store/store';


const NewPost=()=> {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [savedPostData, setSavedPostData] = useState(undefined);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = ()=>{
        console.log(title, text)
        
        let data = { "title": title, "text": text }
        if (!savedPostData){
            httpPost("/posts/create", data)
            .then((data) => {
                setSavedPostData(data);
                dispatch(postsActions.setEditedPost({data: data}))
                navigate(`/posts/${data.id}/edit`);
            });
        }
    }
    
    return(
        <div className={styles.PostEditor}>
            <h1 className={styles.CreateNewPost}>Редактор поста:</h1>
            <h1>
                <input placeholder="Заголовок поста" className={styles.headlineInput} onChange={event => setTitle(event.target.value)}/>
            </h1>
            <p>  
                <textarea rows="20" cols="120" name="textArea" className={styles.postTextarea} placeholder='Текст поста' onChange={event => setText(event.target.value)}/>
            </p>
            <p>
                <button className={styles.btn} onClick={submitHandler}>Coхранить новый пост</button>
            </p>
        </div> 

    );
}

export default NewPost;
