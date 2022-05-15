import "./App.css";
import React, { useState, useContext, useEffect  } from "react";
import NavBar from "./Components/NavBar";
import Profile from "./Components/Profile";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Components/HomePage";
import TwitterContext from "./Context/TwitterContext";
import Login from './Components/Login'
import AuthProvider from "./Components/AuthProvider";
import Signup from "./Components/Signup";

const App = () => {
  const [tweetList, setTweetList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { tweetText, setTweetText} = useContext(TwitterContext)
  const [activeUser, setActiveUser] = useState(localStorage.getItem("isAuth"))
  const navigate = useNavigate()
 
function handleLogout() {
  setActiveUser(false); 
  navigate("/login")
}

useEffect(() => {
  if(!activeUser && window.location.pathname !== ('/login')){
        window.location.pathname = ('/login')
  }
},[])

  return (
  <AuthProvider>
    <div>
      <NavBar activeUser={activeUser} setActiveUser={setActiveUser} onLogout={handleLogout}/>
      <div className="tweetList">
        <TwitterContext.Provider value= {{tweetList, setTweetList, tweetText, setTweetText }}>
        <Routes>

          <Route path="/login" element={<Login setActiveUser={setActiveUser}/>}  />
          <Route path="/signup" element={<Signup />}  />
          <Route
            path="/"
            element={
              <HomePage
              setTweetList={setTweetList}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          
        </Routes>
        </TwitterContext.Provider>
      </div>
    </div>
          
    </AuthProvider>
  );
};

export default App;
