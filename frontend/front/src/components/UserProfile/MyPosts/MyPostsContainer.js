import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyPost from './MyPost';
import { httpGet } from '../../utils/httpClient';
import { useNavigate } from 'react-router';
import { postsActions } from '../../../store/store';


const MyPostsContainer=()=> {
  const dispatch = useDispatch();
  const [myposts, setMyPosts] = useState([])
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); 
    useEffect(() => {
        console.log("B4 MyPosts REQ")
        httpGet(`/posts/my-posts`)
          .then(
            (result) => {
                
              console.log(result);
              setMyPosts(result);
              setIsLoaded(true);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])


  return(
    <>
      <h1 style={{
        textAlign: 'center'
      }}>{myposts.length!==0 ? 'Мои посты:':''}</h1>
      <ul>
        {myposts.map(item => (
          <li key={item.id}>
            <MyPost mypostData = {item}/> 
          </li>
        ))}
      </ul>
    </>
)}
export default MyPostsContainer;