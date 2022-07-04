import styles from "./Comment.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { httpPut } from "../../../utils/httpClient";


const Comment=( { commentData })=> {
    //const navigate = useNavigate();
    const [author, setAuthor] = useState({})
    const [comment, setComment] = useState(commentData)
    const [isEdited, setIsEdited] = useState(false);
    const [editedComment, setEditedComment] = useState({
        text: '',
    })


    useEffect(() => {
    
        async function getCommentJson(commentId){
            return await fetch(`/comments/${commentId}`)
                .then(response => response.json());
        }
    
        async function getUserJson(userId){
            return await fetch(`/users/${userId}`)
                .then(response => response.json())
        }
    
        function processCommentJson(json){
            setComment(json);
            getUserJson(json.author_id)
                .then(userJson => setAuthor(userJson));
        }
    })

    const editHandler=()=>{
        if (!isEdited) {
          setIsEdited(true)
        } else {
          httpPut(`/comments/${comment.id}/edit`, comment)
            .then(setIsEdited(false)
            )
        }
      }
    
      const textHandler=(e)=>{
        setComment(prev=>{
          return {
            ...prev,
          text:e.target.value

          }
        })
        
      }

    return(
        <div className={styles.Comment}>
            <p>
                {isEdited? <textarea value={comment.text} className={styles.editcommentText} onChange={(e)=>textHandler(e)} placeholder='Введите текст комментария'/> : comment?.text}
            </p>
            {/* <p>
                Автор Комментария: {commentData.author_id}
            </p> */}
            <p>
                {new Date(comment.created_date).toLocaleDateString()}  
            </p> 
            <button onClick={editHandler} className={styles.btn}> {!isEdited ? 'Редактировать комментарий': 'Сохранить'}</button>
        </div> 
    );
}

export default Comment;
