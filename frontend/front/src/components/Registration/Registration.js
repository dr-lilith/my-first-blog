import styles from "./Registration.module.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Registration=( { postData })=> {
    const [isSaved, setIsSaved] = useState(false)
    const savedHandler = ()=>{
        setIsSaved(true)

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState('')
    const [isError, setError] = useState(false)
    const navigate = useNavigate();

    async function postData(url = '', data = {}) {
        console.log("try post", data)
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'same-origin', 
          cache: 'no-cache', 
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).catch(handleError);
        return await response.json();
      }

    let handleRegistration = (tokens) => {
        console.log(tokens.name)
        localStorage.setItem("name", tokens.name)
        localStorage.setItem("token", tokens.token)
        localStorage.setItem("refresh_token", tokens.refresh_token)
        navigate(`/`)
        
    }

    let handleError = (error) => {
        console.log(error)
        setError(true)
    }

    const submitHandler = ()=>{
        setError(false);
        setIsSaved(true);
        let data = { "email": email, "password": password, 'username': username}
        postData("/users/register", data)
            .then(handleRegistration, handleError)
            .then(_ => setIsSaved(false))
    }

    }
    return(
        <div className={styles.Registration}>
            <h1 className={styles.RegistrationHeadline}>Регистрация нового пользователя</h1>
            <div className={!isError ? styles.hide : styles.show}>
                <h4>Ошибка</h4>
            </div>
            <input placeholder="Введите email" className={styles.headlineInput} onChange={event => setEmail(event.target.value)}/>
            <input placeholder="Придумайте уникальное имя пользователя" className={styles.headlineInput} onChange={event => setUsername(event.target.value)}/>
            <input placeholder="Придумайте пароль" className={styles.headlineInput}/>
            <input placeholder="Повторите пароль" className={styles.headlineInput} onChange={event => setPassword(event.target.value)}/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={submitHandler}>{!isSaved ? 'Coхранить':'Сохранено'}</button>
            </p>
        </div> 

    );
}

export default Registration;

