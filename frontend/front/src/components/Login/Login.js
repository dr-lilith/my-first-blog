import styles from "./Login.module.css"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postsActions } from "../../store/store";
import { useDispatch } from "react-redux";
import { httpPost } from "../utils/httpClient";
import hide from "../../assets/icons/hide.png"
import show from "../../assets/icons/show.png"


const handleLogin = (tokens) => {
    localStorage.setItem("name", tokens.name)
    localStorage.setItem("token", tokens.token)
    localStorage.setItem("refresh_token", tokens.refresh_token)
    localStorage.setItem("user_id", tokens.user_id)
}

const Login=()=> {
    const [isSaved, setIsSaved] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(undefined)
    const [passwordError, setPasswordError] = useState(undefined)
    const [isError, setError] = useState(false);
    const [type, setType] = useState('password');


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
        if (email.length > 8 && email.includes('@') ){
            setEmailError(false)
        } else {
            setEmailError(true)
        }
        setEmail(event.target.value);

    }

    const passwordValidator = (event)=>{
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
const typeHandler =()=>{
    if(type==='password'){
        setType('text');
        return;
    }else{
        setType('password')
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
            <div className={styles.passwordInputContainer}>
                <input placeholder="Введите пароль" className={styles.passwordInput} type={type} onChange={event => passwordValidator(event)} onKeyPress={passwordPressed}/>
                <span onClick={()=>typeHandler()}><img src={type==="password" ? show : hide} alt="show/hide"/></span>
            </div>
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