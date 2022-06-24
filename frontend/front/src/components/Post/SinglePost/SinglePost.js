import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from "./SinglePost.module.css"


const SinglePost=()=> {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);  
    const [post, setPost] = useState({})
    const {id} = useParams()
    useEffect(() => {
        fetch(`/posts/${id}`)
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setPost(result)
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
    return(
        <div className={styles.container}>
            {(error) && <div>Ошибка: {error.message}</div>}
            {(!isLoaded) && <div>Загрузка...</div>} 
            {
                !error && post &&
                <div>
                    <h1>
                        {post.title}
                    </h1>
                    <p>
                        {post.text}
                    </p>
                    <img alt = 'postImg' src = {post.post_photo}/>
                    <h1>
                        Likes : {post.likes}
                    </h1>
                    <h1>
                        Dislikes : {post.dislikes}  
                    </h1>
                    <p>
                        {new Date(post.created_date).toLocaleDateString()}  
                    </p> 
                </div>

            }
        </div> 
    );
}

export default SinglePost;