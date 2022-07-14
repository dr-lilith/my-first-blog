import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from "./SinglePost.module.css"
import NewComment from './CommentComponent/NewComment';
import like from '../../../assets/icons/like.png'
import dislike from '../../../assets/icons/dislike.png'
import CommentsContainer from './CommentComponent/CommentsContainer';
import { httpPut, httpGet, httpPost } from "../../utils/httpClient";
// import { is } from 'immer/dist/internal';
import NewPost from '../../NewPost/NewPost';


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
    const [liked, setLiked] = useState(false); 
    const [disliked, setDisliked] = useState(false);  

    const navigate = useNavigate();

  useEffect(() => {

    function processLike(json){
        console.log(json);
        if (json.mylike === undefined){
            return;
        }
        
        if (json.mylike)
            setLiked(true);
        else
            setDisliked(true);
    }

    function processPostJson(json){
        setPost(json);
        httpGet(`/posts/${id}/mylike`)
            .then(processLike)
        httpGet(`/users/${json.author_id}`)
            .then(userJson => setAuthor(userJson));
    }

    httpGet(`/posts/${id}`)
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
    navigate("edit");
    if (!isEdited) {
      setIsEdited(true)
    }
  }
  const likeHandler=()=>{
    return httpPost(`/posts/${post.id}/like`, post)
        .then(window.location.reload())}

  const dislikeHandler=()=>{
      return httpPost(`/posts/${post.id}/dislike`, post)
        .then(window.location.reload())}

    console.log(post)
    return(
        <div className={styles.container}>
            {(error) && <div>Ошибка: {error.message}</div>}
            {(!isLoaded) && <div>Загрузка...</div>} 
            {
                !error && post &&
                <div style={{display:'flex', flexDirection:'column'}}>
                    {isEdited
                    ? <NewPost post={post}/> 
                    : <div>
                      <h1>
                          {post?.title}
                      </h1>
                      <p>  
                          {post?.text}
                      </p>
                      {+userId === post?.author_id && <button onClick={()=>editHandler()} className={styles.btn}>Редактировать пост</button>}
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
                    </div>}
                </div>

            }
        </div> 
    );
}

export default SinglePost;
