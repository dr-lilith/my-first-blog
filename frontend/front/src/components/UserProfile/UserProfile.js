import React, { useState, useEffect } from 'react';
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
                {items.date_joined}  
            </p>
            <p>
                {items.description}  
            </p>
            <p>
                <img src={items.avatar} alt='avatar'/>
            </p>
            {
    
    
    // "avatar": "/media/images/20-shutterstock_557126443-1024x683.jpg"
}
        </div>
    );
  }

}


export default UserProfile;
