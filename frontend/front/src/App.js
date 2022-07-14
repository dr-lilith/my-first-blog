import Header from "./components/Header/Header";
import NewPost from "./components/NewPost/NewPost";
import PostsContainer from "./components/PostsContainer/PostsContainer"
import UserProfile from "./components/UserProfile/UserProfile";
import './App.css'
import { Routes, Route } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import SinglePost from "./components/Post/SinglePost/SinglePost";
import Login from "./components/Login/Login";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Header/>
      <div style={{paddingTop: '70px'}}>
        <Routes>
          <Route path='/' element={<PostsContainer/>}/>
          <Route path='/posts' element={<PostsContainer/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/posts/:id' element={<SinglePost/>}/>
          <Route path='/posts/:id/edit' element={<NewPost/>}/>
          <Route path='/user-profile' element={<UserProfile/>}/>
          <Route path='/new-post' element={<NewPost/>}/>
          <Route path='/registration' element={<Registration/>}/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
