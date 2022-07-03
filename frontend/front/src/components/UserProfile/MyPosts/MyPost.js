import styles from "./MyPost.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const MyPost=( { mypostData })=> {
    const navigate = useNavigate();
    const [mypost, setMyPost] = useState("")


    useEffect(() => {
    
        async function getMyPostJson(){
            return await fetch(`/posts/my-posts`)
                .then(response => response.json());
        }
    
        function processMyPostJson(json){
            setMyPost(json);
        }
    })

    return(
        <div className={styles.MyPost}>
            <h1>
                {mypostData.title}
            </h1>
            <p>
                {mypostData.text.slice(0,400)}
            </p>

            <p>
                {new Date(mypostData.created_date).toLocaleDateString()}  
            </p> 
            <button onClick={() => navigate(`/posts/${mypostData.id}`)} className={styles.btn}>Открыть пост</button>
        </div> 
    );
}

export default MyPost;
