import styles from "./Registration.module.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { postsActions } from "../../store/store";
import { useDispatch } from "react-redux";
import { httpPost } from "../utils/httpClient";
import { saveTokens } from "../Login/Login";



const Registration=()=> {
    const [isSaved, setIsSaved] = useState(false)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [isError, setError] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleRegistration(data) {
        console.log(data);
        setEmail(data.email);
        setUsername(data.username);
    }

    let handleError = (error) => {
        console.log(error)
        setError(true)
    }

    const submitHandler = ()=>{
        setError(false);
        setIsSaved(true);
        let data = { "email": email,"password1": password1, "password2": password2, 'username': username}
        httpPost("/users/register", data, handleError)
            .then(handleRegistration(data), handleError)
            .then(_ => setIsSaved(false))
            .then(_ => httpPost("/users/login", {'email':data.email, 'password':data.password1})
                .then(json => saveTokens(json))
                )
            .then(_ => dispatch(postsActions.setIsLogin({data:'login'})))
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


