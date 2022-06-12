import styles from "./Post.module.css"
import React from 'react';

const Post=( { postData })=> {
    return(
        <div>
            <h1 className="post-title">
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