import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from "./SinglePost.module.css"


const SinglePost=()=> {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);  
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState({})
    const {id} = useParams()
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
                        Автор поста: {author.username}
                    </p>
                    <p>
                        {new Date(post.created_date).toLocaleDateString()}  
                    </p> 
                </div>

            }
        </div> 
    );
}

export default SinglePost;
