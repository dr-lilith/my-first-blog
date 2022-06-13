import styles from "./Post.module.css"
import React from 'react'
import "./Post.module.css"


const Post=( { postData })=> {
    return(
        <div style={{
            border: '3px solid #ccc',
            marginBottom: '20px',
            display: 'block',
            padding: '20px',
            boxShadow: '0 8px 5px 0 rgba(0, 0, 0, .14)',
            borderRadius: '5px',
        }}>
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