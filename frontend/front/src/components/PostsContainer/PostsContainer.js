import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsActions } from '../../store/store';
import Post from "../Post/Post"
import styles from './PostsContainer.module.css'


const PostsContainer=()=> {
  const dispatch = useDispatch();
  const posts = useSelector((state)=>state.postItems);
  const [allPosts, setAllPosts] = useState([]);
  const [error, setError] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);  
  const [noPosts, setNoPosts] = useState(false);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    fetch(`/posts?page=${curPage}`)
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
      fetch(`/posts/postlist`)
      .then(res=>res.json())
      .then((result)=>setAllPosts(result))

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
    setCurPage(prev=>prev+1)
  }
  const prevHandler = ()=>{
    setCurPage(prev=>prev-1)
  }
  return(
    <>
    <input placeholder='Поиск поста по названию' className={styles.filterInput} onChange={(e)=>{searchHandler(e)}}/>
    {(error) && <div>Ошибка: {error.message}</div>}
  {(!isLoaded) && <div>Загрузка...</div>}
  {
    !error && posts && allPosts &&
    <div>
      <div className={styles.pagination}>
          <button onClick={prevHandler} disabled={curPage===1}>{'<'}</button>
          {
            paginationButtonsCreator(allPosts.length).map(item=>{
              return <button 
              className={item===curPage ? styles.paginationItemSelected :  styles.paginationItem}
               key={item} onClick={()=>setCurPage(item)}>{item}</button>
            })
          }
          <button disabled={curPage===Math.ceil(allPosts.length/10)} onClick={nextHandler}>{'>'}</button>
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
