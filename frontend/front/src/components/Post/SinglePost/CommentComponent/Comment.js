import styles from "./Comment.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Comment=( { commentData })=> {
    const navigate = useNavigate();
    const [author, setAuthor] = useState({})
    const [comment, setComment] = useState("")


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

    return(
        <div className={styles.Comment}>
            <p>
                {commentData.text}
            </p>
            <p>
                Автор поста: {commentData.author_id}
            </p>
            <p>
                Автор поста: {author.username}
            </p>
            <p>
                {new Date(commentData.created_date).toLocaleDateString()}  
            </p> 
        </div> 
    );
}

export default Comment;
