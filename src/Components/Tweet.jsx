import React, { useState } from "react";
import "../App.css";

const Tweet = (props) => {

 return (
    <div className="tweetList">
      <div className="tweetBox">
        <div className="noteHeader">
          <div className="user">{props.tweet.userName}</div>
          <div className="dateControl">
            <span className="noteEl">{props.tweet.date}</span>
          </div>
        </div>
        <div className="tweetControl">
          <span className="noteEl">{props.tweet.content}</span>
          <img className="avatarControl" src={props.tweet.image}></img>
        </div>
        
        
      </div>
    </div>
  );
};

export default Tweet;
