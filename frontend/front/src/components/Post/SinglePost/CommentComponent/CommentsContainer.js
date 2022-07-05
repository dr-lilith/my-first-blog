import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import { httpGet } from '../../../utils/httpClient';
import { useNavigate } from 'react-router';
import { postsActions } from '../../../../store/store';


const CommentsContainer=()=> {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([])
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); 
    useEffect(() => {
        let id = window.location.pathname.split('/')[2]
        console.log("B4 COMMENTS REQ")
        httpGet(`/comments/post/${id}`)
          .then(
            (result) => {
                
              console.log(result);
              setIsLoaded(true);
              setComments(result.comments);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])


  return(
      <ul>
        {comments.map(item => (
          <li key={item.id}>
            <Comment commentData = {item}/> 
          </li>
        ))}
      </ul>
)}
export default CommentsContainer;