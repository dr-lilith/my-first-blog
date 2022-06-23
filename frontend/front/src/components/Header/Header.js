import styles from "./Header.module.css"
import React from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postsActions } from "../../store/store";


const Header=()=> {
    const isLogin = useSelector((state) => state.isLogin)
    const dispatch = useDispatch()
    const loginHandler = ()=>{
        if (isLogin){
            dispatch(postsActions.setIsLogin({data:'logout'}))
        }
        else {
            dispatch(postsActions.setIsLogin({data:'login'}))
        }
    }
    return(
        <div className={styles.container}>
            <h1 className={styles.headline}>Звериный блог :{')'}</h1>
            <div className={styles.buttons}>
                <NavLink to='/'><button className={styles.btn}>Лента</button></NavLink>
                {isLogin && <NavLink to='/new-post'><button className={styles.btn}>Новый пост</button></NavLink>}
                {isLogin && <NavLink to='/user-profile'><button className={styles.btn}>Мой профиль</button></NavLink>}
                <button onClick={loginHandler} className={styles.btn}>{isLogin ? "Выход":"Вход"}</button>
            </div>
        </div> 
    );
}

export default Header;