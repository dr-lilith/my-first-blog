import styles from "./PostEditor.module.css"
import React, { useState } from 'react'
import TagInputComponent from '../../NewPost/TagInputComponent/TagInputComponent'
import { useNavigate } from 'react-router-dom'
import { httpPost, httpPut } from "../../utils/httpClient";
import ImageUploader from "../../ImageUploader/ImageUploader";
import { useSelector } from 'react-redux';


const PostEditor=({ post })=> {
    let editedPost = useSelector((state)=>state.editedPost);
    editedPost = post ? post: editedPost;
    const [title, setTitle] = useState(editedPost?.title ?? "")
    const [text, setText] = useState(editedPost?.text ?? "")
    const [savedPostData, setSavedPostData] = useState(undefined);
    const [tags, setTags] = React.useState([
        { id: 'Thailand', text: 'Thailand' },
        { id: 'India', text: 'India' },
        { id: 'Vietnam', text: 'Vietnam' },
        { id: 'Turkey', text: 'Turkey' },
      ]);
    const navigate = useNavigate()
    const submitHandler = ()=>{
        console.log(title, text)
        let data = { "title": title, "text": text }
        if (!savedPostData && !editedPost?.id){
            httpPost("/posts/create", data)
            .then((data) => {
                setSavedPostData(data);
                navigate(`/posts/${data.id}/edit`);
            });
        }
        if (!savedPostData && editedPost?.id){
            httpPut(`/posts/${editedPost.id}/edit`, data)
            .then(setSavedPostData) 
        }
    }
    return(
        <div className={styles.PostEditor}>
            <h1 className={styles.CreatePostEditor}>Редактор поста:</h1>
            <h1>
                {editedPost?.id 
                  ?<input value={title} className={styles.editpostHeadline} onChange={event => setTitle(event.target.value)} placeholder='Введите заголовок поста'/>
                  :<input placeholder="Заголовок поста" className={styles.headlineInput} onChange={event => setTitle(event.target.value)}/>}
            </h1>
            <p>  
                {editedPost?.id 
                  ?<textarea value={text} className={styles.editpostText} onChange={event => setText(event.target.value)} placeholder='Введите текст поста'/>
                  :<textarea rows="20" cols="120" name="textArea" className={styles.postTextarea} placeholder='Текст поста' onChange={event => setText(event.target.value)}/>}
            </p>
            <h2 className={styles.CreatePostEditor}>К своему посту Вы также можете:</h2>
            <ImageUploader oldImage={editedPost?.image ?? undefined} url={`/posts/${savedPostData?.id}/upload_post_photo`}/>
            <TagInputComponent tags={tags} setTags={setTags}/>
            <button className={styles.btn} onClick={submitHandler}>Coхранить изменения</button>
        </div> 

    );
}

export default PostEditor;
