import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../../store/store';
import Post from "../Post/Post"
import styles from './PostsContainer.module.css'


const PostsContainer=()=> {
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.postItems);
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);  
  const [noPosts, setNoPosts] = useState(false);
  useEffect(() => {
    fetch("/posts")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          dispatch(postsActions.setPosts({data: result}))
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [dispatch])
  const searchHandler=(e)=>{
    if (e.target.value==='') {
      setFilteredPosts([])
    }
    const arr = []
    posts.forEach(element => {
      if (element.title.toLowerCase().includes(e.target.value.toLowerCase())) {
        arr.push(element)
      }
    else {
      setNoPosts(true)
    }
    });
    setFilteredPosts(arr)
  }
  return(
    <>
    <input placeholder='Поиск поста по названию' className={styles.filterInput} onChange={(e)=>{searchHandler(e)}}/>
    {(error) && <div>Ошибка: {error.message}</div>}
  {(!isLoaded) && <div>Загрузка...</div>}
  {
    !error && posts && 
      <ul>
        {filteredPosts.length===0 && !noPosts ? posts.map(item => (
          <li key={item.id}>
            <Post postData = {item}/> 
          </li>
        ))
      : filteredPosts.map(item => (
        <li key={item.id}>
          <Post postData = {item}/> 
        </li>
      ))
      }
      </ul>} 
       {!error && noPosts && <h1>К сожалению, нет совпадений {':('}</h1>}
      </>
)}

export default PostsContainer;
