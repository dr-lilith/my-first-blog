import { configureStore, createSlice } from "@reduxjs/toolkit";
import { validateLogin } from "../components/utils/httpClient";

const initialState = {
	isLogin: validateLogin(),
    postItems: [],

};

const postsSlice = createSlice({
	name: "postsList",
	initialState,
	reducers: {
        setIsLogin(state, action) {
            if(action.payload.data==='login'){
                state.isLogin = true
            } else {
                state.isLogin = false
            }
        },
        setPosts(state, action) {
            state.postItems = [...action.payload.data];
        }
		
	},
});

export const postsActions = postsSlice.actions;

export const store = configureStore({
	reducer: postsSlice.reducer,
});
