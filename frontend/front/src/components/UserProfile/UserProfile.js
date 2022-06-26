import React, { useState, useEffect } from 'react';
import AvatarUploader from './AvatarUploader/AvatarUploader';
import styles from "./UserProfile.module.css"


const UserProfile=()=> {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMTQwOTcwLCJpYXQiOjE2NTUxNDEwMzAsImp0aSI6ImM1MGE4N2VjYTc5YTQ4NGRiNTdmZjk5NjVlODc1ZDkzIiwidXNlcl9pZCI6OH0.L2K3ymjvGTMUzwoAqhJPQvnG70mqsY9GefZloQ2e4zA";
    let headers = new Headers({ 'Authorization': `Bearer ${token}`});

    fetch("/users/profile", { "headers": headers, })
      .then(res => {
        return res.json()})
      .then(
        (result) => {
          console.log(result)
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
        <div className={styles.UserProfile}>
          <div>
            <AvatarUploader oldAvatar={items.avatar}/>
          </div>
          <div>
          <h1>
                {items.first_name}
            </h1>
            <h1>
                {items.last_name}
            </h1>
            <h1>
                {items.username}
            </h1>
            <p>
                {items.email}
            </p>
            <p>
                {new Date(items.date_joined).toLocaleDateString()}  
            </p>
            <p>
                {items.description}  
            </p>
          </div>
            {
    
}
        </div>
    );
  }

}


export default UserProfile;
