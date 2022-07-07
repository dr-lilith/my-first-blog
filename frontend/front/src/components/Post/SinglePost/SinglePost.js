import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from "./SinglePost.module.css"
import NewComment from './CommentComponent/NewComment';
import like from '../../../assets/icons/like.png'
import dislike from '../../../assets/icons/dislike.png'
import CommentsContainer from './CommentComponent/CommentsContainer';
import { httpPut } from "../../utils/httpClient";
import { httpPost } from "../../utils/httpClient";


const SinglePost=()=> {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);  
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState({})
    const {id} = useParams()
    const [isEdited, setIsEdited] = useState(false);
    const [items, setItems] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const userId = localStorage.getItem('user_id')

    
  useEffect(() => {

        
    async function getPostJson(postId){
        return await fetch(`/posts/${postId}`)
            .then(response => response.json());
    }

    async function getUserJson(userId){
        return await fetch(`/users/${userId}`)
            .then(response => response.json())
    }

    function processPostJson(json){
        setPost(json);
        getUserJson(json.author_id)
            .then(userJson => setAuthor(userJson));
    }

    getPostJson(id)
        .then(processPostJson,
            err => {
                setIsLoaded(true);
                setError(err);
            }
        )
        .then(_ => setIsLoaded(true))
        if (!selectedFile) {
            setPreview(undefined);
            return;
          }
      
          const objectUrl = URL.createObjectURL(selectedFile);
          setPreview(objectUrl);
      
          return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile])
const editHandler=()=>{
    if (!isEdited) {
      setIsEdited(true)
    } else {
      httpPut(`/posts/${post.id}/edit`, post)
            .then(setIsEdited(false)
            )
    }
  }
  const likeHandler=()=>{
    return httpPost(`/posts/${post.id}/like`, post)
        .then(window.location.reload())}

  const dislikeHandler=()=>{
      return httpPost(`/posts/${post.id}/dislike`, post)
        .then(window.location.reload())}

  const titleHandler=(e)=>{
    setPost(prev=>{
      return {
        ...prev,
      title:e.target.value

      }
    })
  }

  const textHandler=(e)=>{
    setPost(prev=>{
      return {
        ...prev,
      text:e.target.value

      }
    })
  }
    
  const imageHandler = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
    setPost(prev=>{
        return {
          ...prev,
        text:selectedFile
  
        }
      })
  };
    console.log(post)
    return(
        <div className={styles.container}>
            {(error) && <div>Ошибка: {error.message}</div>}
            {(!isLoaded) && <div>Загрузка...</div>} 
            {
                !error && post &&
                <div style={{display:'flex', flexDirection:'column'}}>
                    <h1>
                        {isEdited? <input value={post.title} className={styles.editpostHeadline} onChange={(e)=>titleHandler(e)} placeholder='Введите заголовок поста'/> : post?.title}
                    </h1>
                    <p>  
                        {isEdited? <textarea value={post.text} className={styles.editpostText} onChange={(e)=>textHandler(e)} placeholder='Введите текст поста'/> : post?.text}
                    </p>
                    {isEdited? <div>
                                    <label htmlFor="postImage">Обновить фото</label>
                                    <input type="file"
                                        onChange={(e)=>{imageHandler(e)}}
                                        id="postImage"
                                        accept=".jpg, .jpeg, .png"
                                        style={{visibility: 'hidden'}}
                                        /></div> : 
                    <img alt = 'postImg' src = {post?.post_photo}/>}
                    {+userId === post?.author_id && <button onClick={()=>editHandler()} className={styles.btn}> {!isEdited ? 'Редактировать пост': 'Сохранить'}</button>}
                    <div>
                        <button disabled={!typeof post.my_like==='null'} onClick={()=>likeHandler()} className={styles.btn}>
                            <img src={like} className={styles.img}/> {post.likes}
                         </button>
                        <button disabled={!typeof post.my_like==='null'} onClick={()=>dislikeHandler()} className={styles.btn}>
                            <img src={dislike} className={styles.img}/> {post.dislikes}  
                        </button>
                    </div>
                    <p>
                        Автор поста: {author.username}
                    </p>
                    <p>
                        {new Date(post.created_date).toLocaleDateString()}  
                    </p> 
                    <NewComment/>
                    <CommentsContainer/>
                </div>

            }
        </div> 
    );
}

export default SinglePost;
