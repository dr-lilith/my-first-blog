import styles from "./Post.module.css"
import React from 'react'


const Post=( { postData })=> {
    const style = {
        border: '1px solid #ccc',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)'
    }
    return(
        <div className={styles.Post}>
            <h1>
                {postData.title}
            </h1>
            <p>
                {postData.text}
            </p>
            <p>
                {postData.author_id_id}  
            </p>
        </div> 
    );
}

export default Post;