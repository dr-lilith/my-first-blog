import styles from "./Registration.module.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Registration=()=> {
    const [isSaved, setIsSaved] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
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

    function handleRegistration(data) {
        console.log(data);
        localStorage.setItem("email", data.email);
        localStorage.setItem("username", data.username);
    }

    let handleError = (error) => {
        console.log(error)
        setError(true)
    }

    const submitHandler = ()=>{
        setError(false);
        setIsSaved(true);
        let data = { "email": email,"password1": password1, "password2": password2, 'username': username}
        postData("/users/register", data)
            .then(handleRegistration(data), handleError)
            .then(_ => setIsSaved(false))
            .then(_ => postData("/users/login", {'email':data.email, 'password':data.password1}))
            .then(_ => navigate(`/`));
    }
    return(
        <div className={styles.Registration}>
            <h1 className={styles.RegistrationHeadline}>Регистрация нового пользователя</h1>
            <div className={!isError ? styles.hide : styles.show}>
                <h4>Ошибка</h4>
            </div>
            <input placeholder="Введите email" className={styles.headlineInput} onChange={event => setEmail(event.target.value)}/>
            <input placeholder="Придумайте уникальное имя пользователя" className={styles.headlineInput} onChange={event => setUsername(event.target.value)}/>
            <input placeholder="Придумайте пароль" className={styles.headlineInput} onChange={event => setPassword1(event.target.value)}/>
            <input placeholder="Повторите пароль" className={styles.headlineInput} onChange={event => setPassword2(event.target.value)}/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={submitHandler}>{!isSaved ? 'Coхранить':'Сохранено'}</button>
            </p>
        </div> 

    );
}

export default Registration;

