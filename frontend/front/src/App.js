import Header from "./components/Header/Header";
import PostsContainer from "./components/PostsContainer/PostsContainer"
import UserProfile from "./components/UserProfile/UserProfile";
function App() {
  return (
    <div className="App">
      <Header/>
      <div style={{paddingTop: '70px'}}>
        <UserProfile/>
        <PostsContainer/>
      </div>
    </div>
  );
}

export default App;
