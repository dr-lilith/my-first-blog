import React, { useState, useEffect } from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import styles from "./UserProfile.module.css"


const UserProfile=()=> {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedUser, setEditedUser] = useState({
    avatar: '',
    first_name: '',
    last_name: '',
    description: '',
  })
  useEffect(() => {
    
    const token = localStorage.getItem('token')
    // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMTQwOTcwLCJpYXQiOjE2NTUxNDEwMzAsImp0aSI6ImM1MGE4N2VjYTc5YTQ4NGRiNTdmZjk5NjVlODc1ZDkzIiwidXNlcl9pZCI6OH0.L2K3ymjvGTMUzwoAqhJPQvnG70mqsY9GefZloQ2e4zA";
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

  const editHandler=()=>{
    if (!isEdited) {
      setIsEdited(true)
    } else {
      setIsEdited(false)
      // отправка данных на бэк
      console.log(items)
    }
  }
  const firstNameHandler=(e)=>{
    setItems(prev=>{
      return {
        ...prev,
      first_name:e.target.value

      }
    })
  }
  const lastNameHandler=(e)=>{
    setItems(prev=>{
      return {
        ...prev,
      last_name:e.target.value

      }
    })
  }

  const descriptionHandler=(e)=>{
    setItems(prev=>{
      return {
        ...prev,
      description:e.target.value

      }
    })
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div>
        <div className={styles.UserProfile}>
          <div>
            <p>
                <img src={items?.avatar} alt='avatar'/>
            </p>
            <p>
                <button className={styles.btn}>Обновить фото</button>
            </p>
          </div>
          <div>
          <h1>
                {isEdited? <input value={items.first_name} onChange={(e)=>firstNameHandler(e)} placeholder='Введите имя'/> : items?.first_name}
            </h1>
            <h1>
                {isEdited? <input value={items.last_name} onChange={(e)=>lastNameHandler(e)} placeholder='Введите фамилию'/> : items?.last_name}

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
              {isEdited? <textarea value={items.description} onChange={(e)=>descriptionHandler(e)} placeholder='Введите описание профиля'/> : items?.description}
            </p>
            <button onClick={()=>editHandler()} className={styles.btn}> {!isEdited ? 'Редактировать профиль': 'Сохранить'}</button>
          </div>
        </div>
        <MyPostsContainer/>
      </div>
    );
  }

}


export default UserProfile;
