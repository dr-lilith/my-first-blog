import styles from "./Login.module.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login=()=> {
    const [isSaved, setIsSaved] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [isError, setError] = useState(false)
    const navigate = useNavigate();

    
    //todo extract the following function to the API client component
    async function postData(url = '', data = {}) {
        console.log("try post", data)
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'same-origin', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).catch(handleError);
        return await response.json(); // parses JSON response into native JavaScript objects
      }
    
    let handleLogin = (tokens) => {
        //TODO implement tokens saving for app globally
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
        let data = { "email": email, "password": password }
        postData("/users/login", data)
            .then(handleLogin, handleError)
            .then(_ => setIsSaved(false))
    }
    
    return(
        <div className={styles.Login}>
            <h1 className={styles.LoginHeadline}>Вход</h1>
            <div className={!isError ? styles.hide : styles.show}>
                <h4>Ошибка</h4>
            </div>
            <input placeholder="Введите email" className={styles.headlineInput} onChange={event => setEmail(event.target.value)}/>
            <input placeholder="Введите пароль" className={styles.headlineInput} onChange={event => setPassword(event.target.value)}/>
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={submitHandler}>{!isSaved ? 'Войти':'Вход...'}</button>
            </p>
        </div> 
    );
}

export default Login;