// import styles from "./PostsContainer.module.css"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../../store/store';
import Post from "../Post/Post"


const PostsContainer=()=> {
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.postItems)
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);  
  useEffect(() => {
    fetch("/posts")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          dispatch(postsActions.setPosts({data: result}))
        },
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [dispatch])
  return(
    <>
    {(error) && <div>Ошибка: {error.message}</div>}
  {(!isLoaded) && <div>Загрузка...</div>}
  {
    !error && posts && 
      <ul>
        {posts.map(item => (
          <li key={item.id}>
            <Post postData = {item}/> 
          </li>
        ))}
      </ul>}</>
)}

export default PostsContainer;
