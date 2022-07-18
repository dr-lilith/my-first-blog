import styles from "./PostEditor.module.css"
import React, { useState, useEffect } from 'react'
import TagInputComponent from '../../NewPost/TagInputComponent/TagInputComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { httpGet, httpPut } from "../../utils/httpClient";
import ImageUploader from "../../ImageUploader/ImageUploader";


const PostEditor=({ })=> {
    const [editedPost, setEditedPost] = useState(undefined);
    const [title, setTitle] = useState(editedPost?.title ?? "");
    const [text, setText] = useState(editedPost?.text ?? "");
    const {id} = useParams();
    const [tags, setTags] = React.useState([
        { id: 'Thailand', text: 'Thailand' },
        { id: 'India', text: 'India' },
        { id: 'Vietnam', text: 'Vietnam' },
        { id: 'Turkey', text: 'Turkey' },
      ]);
    
    useEffect(() => {
        if (!editedPost){
            httpGet(`/posts/${id}`)
                .then((data) => {
                    setEditedPost(data);
                    setTitle(data.title);
                    setText(data.text);
                }); 
        }
    },[])    
    
    const navigate = useNavigate()
    const submitHandler = ()=>{
        console.log(title, text)
        let data = { "title": title, "text": text };
        httpPut(`/posts/${editedPost.id}/edit`, data)
            .then(() => navigate(`/posts/${editedPost.id}`));
    }

    return(
        <div className={styles.PostEditor}>
            <h1 className={styles.CreatePostEditor}>Редактор поста:</h1>
            <h1>
                  <input value={title} className={styles.editpostHeadline} onChange={event => setTitle(event.target.value)} placeholder='Введите заголовок поста'/>
            </h1>
            <p>  
                <textarea value={text} className={styles.editpostText} onChange={event => setText(event.target.value)} placeholder='Введите текст поста'/>
            </p>
            <h2 className={styles.CreatePostEditor}>К своему посту Вы также можете:</h2>
            <ImageUploader oldImage={editedPost?.image ?? undefined} url={`/posts/${editedPost?.id}/upload_post_photo`}/>
            <TagInputComponent tags={tags} setTags={setTags}/>
            <button className={styles.btn} onClick={submitHandler}>Coхранить изменения</button>
        </div> 

    );
}

export default PostEditor;
