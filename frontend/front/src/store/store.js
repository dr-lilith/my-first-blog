import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLogin: localStorage.getItem("token") ? true : false,
    postItems: [],
    tagItems: []
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
        },
        setPostTags(state, action){
            state.tagItems = [...action.payload.data];
        },
	},
});

export const postsActions = postsSlice.actions;
export const store = configureStore({
	reducer: postsSlice.reducer
});
