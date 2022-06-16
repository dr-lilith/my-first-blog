import styles from "./PostEditor.module.css"
import React from 'react'


const PostEditor=( { postData })=> {
    const style = {
        border: '1px solid #ccc',
        boxShadow: '0 4px 5px 0 rgba(0, 0, 0, .14)'
    }
    return(
        <div className={styles.PostEditor}>
            <h1 className={styles.CreateNewPost}>Создание нового поста:</h1>
            <textarea rows="2" cols="120" name="textArea"></textarea>
            <textarea rows="20" cols="120" name="textArea"></textarea>
            <p>
                <button className={styles.btn}>Coхранить навый пост</button>
            </p>
        </div> 

    );
}

export default PostEditor;