import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";
import { Spinner, Button } from "react-bootstrap";
import TwitterContext from "../Context/TwitterContext";
import { tweetRef, auth, userRef } from "../firebase/firebase";
import { addDoc }  from "firebase/firestore";

const TweetForm = (props) => {
  
  const [tweetText, setTweetText] = useState("");
  const [userName, setUserName] = useState(null);
  const [profileName, setProfileName] = useState("Steven");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoading, setIsLoading } = props;

  const {tweetList, handleTweet, setTweetList } = useContext(TwitterContext)
  
  function date() {
    let date = new Date();
    let newDate = date.toISOString();
    return newDate;
  }
  function addTweet(event) {
    setTweetText(event.target.value);
  }
  function name() {
    const profileName = JSON.parse(localStorage.getItem("new-Username"));
    if (profileName) {
      setProfileName(profileName);
    }
  }
  useEffect(() => {
    name(); 
  }, [profileName]);

const createPost = async () => {

  await addDoc(tweetRef, {content: tweetText, userName: profileName, image: auth.currentUser.photoURL || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png", date: date()})
  setTweetText("");
  setUserName(profileName);
  }
  
  function errorCharLength() {
    if (tweetText.length >= 140) {
      return "The tweet can't contain more than 140 char.";
    }
  }
  
  return (
    <TwitterContext.Consumer>
      {() => (
    <div className="pageContainer d-flex flex-column align-items-center">
      <div className="formContainer d-flex flex-column">
        <form>
          <label htmlFor="location">
            <textarea
              maxLength={140}
              className="tweetForm"
              id="tweetText"
              value={tweetText}
              placeholder="What you have in mind..."
              onChange={addTweet}
            ></textarea>
           
          </label>
          <div className="containerControl d-flex flex-row justify-content-between">
            <div className="errorContainer">{errorCharLength()}{errorMessage} </div>
            <div className="button">
              <Button
                variant="primary"
                className="mx-2"
                onClick={createPost}
                disabled={tweetText.length >= 140}
              >
                {isLoading ? (<Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />) : ("Tweet" )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
       )}
       </TwitterContext.Consumer>
   
  );
};

export default TweetForm;