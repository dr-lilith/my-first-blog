import Header from "./components/Header/Header";
import NewPost from "./components/NewPost/NewPost";
import PostsContainer from "./components/PostsContainer/PostsContainer"
import UserProfile from "./components/UserProfile/UserProfile";
import './App.css'
import { Routes, Route } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import EditProfile from "./components/EditProfile/EditProfile";
function App() {
  return (
    <div className="App">
      <Header/>
      <div style={{paddingTop: '70px'}}>
        <Routes>
          <Route path='/' element={<PostsContainer/>}/>
          <Route path='/user-profile' element={<UserProfile/>}/>
          <Route path='/edit-profile' element={<EditProfile/>}/>
          <Route path='/new-post' element={<NewPost/>}/>
          <Route path='/registration' element={<Registration/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
