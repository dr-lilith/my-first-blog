import React, { useState, useEffect } from 'react';
import styles from "./UserProfile.module.css"
import React from 'react'


const UserProfile=()=> {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch("/users/profile")
      .then(res => res.json())
      .then(
        (result) => {
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
                {UserProfileData.first_name}
            </h1>
            <h1>
                {UserProfileData.last_name}
            </h1>
            <h1>
                {UserProfileData.username}
            </h1>
            <p>
                {UserProfileData.email}
            </p>
            <p>
                {UserProfileData.date_joined}  
            </p>
            <p>
                {UserProfileData.description}  
            </p>
            {
    
    
    // "avatar": "/media/images/20-shutterstock_557126443-1024x683.jpg"
}
        </div>
    );
  }

}


export default UserProfile;
