import styles from "./NewComment.module.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { httpPost } from "../../../utils/httpClient";


const Comment=()=> {
    const [isSaved, setIsSaved] = useState(false)
    const savedHandler = ()=>{
        setIsSaved(true)
    }
    const [comment, setComment] = useState("")
    const [savedPostData, setSavedPostData] = useState({})
    const navigate = useNavigate()

    const submitHandler = ()=>{
        console.log(comment)
        setIsSaved(true);
        let id = window.location.pathname.split('/')[2]
        console.log(id, comment)
        let data = { "text": comment, 'post_id':id }
        httpPost("/comments/create", data)
            .then(setSavedPostData)
            .then(console.log(savedPostData))
            .then(window.location.reload())

    }

    return(
        <div className={styles.Comment}>
            <textarea rows="5" cols="120" name="textArea" className={styles.commentTextarea} placeholder='Оставьте комментарий' onChange={event => setComment(event.target.value)}/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={submitHandler}>{!isSaved ? 'Coхранить комментарий':'Сохранено'}</button>
            </p>
        </div> 

    );
}

export default Comment;