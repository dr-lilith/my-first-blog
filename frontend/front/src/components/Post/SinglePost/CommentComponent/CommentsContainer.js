import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import { httpGet } from '../../../utils/httpClient';

const CommentsContainer=()=> {
  const dispatch = useDispatch();
  //const comments = useSelector((state)=>state.commentItems)
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);  
  useEffect(() => {
    let id = window.location.pathname.split('/')[2] //todo pass in props
    httpGet(`comments/post/${id}`)
        .then(data => {setComments(data);console.log(data)})
    // fetch(`comments/post/${id}`)
    //   .then(res => res.json())
    })
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