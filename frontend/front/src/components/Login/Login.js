import styles from "./Login.module.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postsActions } from "../../store/store";
import { useDispatch } from "react-redux";
import { httpPost } from "../utils/httpClient";

const handleLogin = (tokens) => {
    console.log(tokens.name)
    localStorage.setItem("name", tokens.name)
    localStorage.setItem("token", tokens.token)
    localStorage.setItem("refresh_token", tokens.refresh_token)
}

const Login=()=> {
    const [isSaved, setIsSaved] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(undefined)
    const [passwordError, setPasswordError] = useState(undefined)
    const [isError, setError] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    let handleError = (error) => {
        console.log(error)
        setError(true)
    }

    const submitHandler = ()=>{
        setError(false);
        setIsSaved(true);
        let data = { "email": email, "password": password }
        httpPost("/users/login", data, handleError)
            .then(json => { handleLogin(json); navigate(`/`); } , handleError)
            .then(_ => setIsSaved(false))
            .then(_ => dispatch(postsActions.setIsLogin({data:'login'})))
    }
    const emailValidator = (event)=>{
        console.log(event.target.value);
        if (email.length > 8 && email.includes('@') ){
            setEmailError(false)
        } else {
            setEmailError(true)
        }
        setEmail(event.target.value);

    }

    const passwordValidator = (event)=>{
        console.log(event.target.value)
        if (password.length > 1){
            setPasswordError(false)
        } else {
            setPasswordError(true)
        }
        setPassword(event.target.value);
    }
    const passwordPressed=e=>{
        if (e.key==='Enter' && !passwordError){
            submitHandler()
        }
    }

    return(
        <div className={styles.Login}>
            <h1 className={styles.LoginHeadline}>Вход</h1>
            <div className={!isError ? styles.hide : styles.show}>
                <h4>Ошибка</h4>
            </div>
            <input placeholder="Введите email" className={styles.headlineInput} onChange={event => emailValidator(event)}/>
            {emailError===true && 
                <p>Email error, it should contain '@'</p>
            } 
            <input placeholder="Введите пароль" className={styles.headlineInput} onChange={event => passwordValidator(event)} onKeyPress={passwordPressed}/>
            {passwordError===true && 
                <p>Password error, it shouldbe longer</p>
            } 
            <p>
                <button className={!isSaved ? styles.btn: styles.btnSaved} onClick={submitHandler}>{!isSaved ? 'Войти':'Вход...'}</button>
            </p>
        </div> 
    );
}

export default Login;
export const saveTokens = handleLogin;