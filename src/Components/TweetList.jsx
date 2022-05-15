import React, {useContext} from "react";
import Tweet from "./Tweet";
import { useEffect } from "react";
import TwitterContext from "../Context/TwitterContext";
import { tweetRef } from "../firebase/firebase";
import { orderBy, onSnapshot, query} from 'firebase/firestore'

function TweetList(props) {
const { tweetList ,setTweetList} = useContext(TwitterContext)
const collectionSorted = query(tweetRef, orderBy("date", "desc"))
  useEffect(() => {
    const unsubscribe =
      onSnapshot(collectionSorted, (snapshot) =>{
        setTweetList(snapshot.docs.map((doc) => ({ ...doc.data(), id:doc.id})))
      })
    return ()=> {
      unsubscribe()
    }
  }, [])

 return (
    <TwitterContext.Consumer>
      {({ tweetList }) => (
        <div>
          {tweetList.sort((a, b) => (a.date < b.date)).map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet}  />
          ))}
        </div>
      )}
    </TwitterContext.Consumer>
  );
}

export default TweetList;