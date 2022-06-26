import styles from "./Post.module.css"
import React from 'react'
import { useNavigate } from 'react-router-dom';


const Post=( { postData })=> {
    const navigate = useNavigate();
    return(
        <div className={styles.Post}>
            <h1>
                {postData.title}
            </h1>
            <p>
                {postData.text.slice(0,400)}
            </p>
            <button onClick={() => navigate(`/posts/${postData.id}`)} className={styles.btn}>Открыть пост</button>
            
        </div> 
    );
}

export default Post;
