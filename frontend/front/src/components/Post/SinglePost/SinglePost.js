import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from "./SinglePost.module.css"
import NewComment from './CommentComponent/NewComment';
import like from '../../../assets/icons/like.png'
import dislike from '../../../assets/icons/dislike.png'
import CommentsContainer from './CommentComponent/CommentsContainer';



const SinglePost=()=> {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);  
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState({})
    const {id} = useParams()
    const [isEdited, setIsEdited] = useState(false);
    const [items, setItems] = useState([]);
    const [editedPost, setEditedUser] = useState({
        title: '',
        text: '',
  })
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
  }, [])
const editHandler=()=>{
    if (!isEdited) {
      setIsEdited(true)
    } else {
      setIsEdited(false)
      // отправка данных на бэк
      console.log(post)
    }
  }
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
    
      
    console.log(post)
    return(
        <div className={styles.container}>
            {(error) && <div>Ошибка: {error.message}</div>}
            {(!isLoaded) && <div>Загрузка...</div>} 
            {
                !error && post &&
                <div>
                    <h1>
                        {isEdited? <input value={post.title} className={styles.editpostHeadline} onChange={(e)=>titleHandler(e)} placeholder='Введите заголовок поста'/> : post?.title}
                    </h1>
                    <p>  
                        {isEdited? <textarea value={post.text} className={styles.editpostText} onChange={(e)=>textHandler(e)} placeholder='Введите текст поста'/> : post?.text}
                    </p>
                    <button onClick={()=>editHandler()} className={styles.btn}> {!isEdited ? 'Редактировать пост': 'Сохранить'}</button>
                    <img alt = 'postImg' src = {post?.post_photo}/>
                    <button disabled={!typeof post.my_like==='null'} className={styles.btn}>
                        <img src={like} className={styles.img}/> {post.likes}
                    </button>
                    <button disabled={!typeof post.my_like==='null'} className={styles.btn}>
                        <img src={dislike} className={styles.img}/> {post.dislikes}  
                    </button>
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
