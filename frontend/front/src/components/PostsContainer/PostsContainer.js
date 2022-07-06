import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../../store/store';
import Post from "../Post/Post"
import styles from './PostsContainer.module.css'
import { httpGet } from '../utils/httpClient';

const PostsContainer=()=> {
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.postItems);
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);  
  const [noPosts, setNoPosts] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [postsCount, setPostsCount] = useState(0);
  const [pagesCount, setPagesCount] = useState(1);
  const pageSize = 10;

  const loadPostsPage=(num, size) =>
  {
    httpGet(`/posts/pages/${curPage}/size/${pageSize}`)
      .then(
        (result) => {
          setPostsCount(result.count);
          setPagesCount(result.pages_count);
          dispatch(postsActions.setPosts({data: result.posts}))
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
      loadPostsPage(curPage, pageSize)

  }, [curPage])

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

  const paginationButtonsCreator =(num) =>{
    const arr =[];
    for(let i =1; i<= Math.ceil(num/10); i++){
      arr.push(i)
    }
    return arr;
  }
  const nextHandler = ()=>{
    loadPostsPage(curPage+1,pageSize)
    setCurPage(prev=>prev+1)
  }
  const prevHandler = ()=>{
    loadPostsPage(curPage-1,pageSize)
    setCurPage(prev=>prev-1)
  }
  return(
    <>
    <input placeholder='Поиск поста по названию' className={styles.filterInput} onChange={(e)=>{searchHandler(e)}}/>
    {(error) && <div>Ошибка: {error.message}</div>}
  {(!isLoaded) && <div>Загрузка...</div>}
  {
    !error && posts &&
    <div>
      <div className={styles.pagination}>
          <button onClick={prevHandler} disabled={curPage===1}>{'<'}</button>
          {
            paginationButtonsCreator(postsCount).map(item=>{
              return <button 
              className={item===curPage ? styles.paginationItemSelected :  styles.paginationItem}
               key={item} onClick={()=>setCurPage(item)}>{item}</button>
            })
          }
          <button disabled={curPage===Math.ceil(postsCount/pageSize)} onClick={nextHandler}>{'>'}</button>
      </div>
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
    </ul>
      
    </div>
      } 
       {!error && noPosts && <h1>К сожалению, нет совпадений {':('}</h1>}
      </>
)}

export default PostsContainer;
