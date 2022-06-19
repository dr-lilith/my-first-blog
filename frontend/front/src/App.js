import Header from "./components/Header/Header";
import NewPost from "./components/NewPost/NewPost";
import PostsContainer from "./components/PostsContainer/PostsContainer"
import UserProfile from "./components/UserProfile/UserProfile";
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header/>
      <div style={{paddingTop: '70px'}}>
        <Routes>
          <Route path='/' element={<PostsContainer/>}/>
          <Route path='/user-profile' element={<UserProfile/>}/>
          <Route path='/new-post' element={<NewPost/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
