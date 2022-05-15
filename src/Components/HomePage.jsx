import React, { useContext } from 'react';
import TweetForm from './TweetForm';
import TweetList from './TweetList';

const HomePage = (props) => {
const { isLoading, setIsLoading } = props

    return (
       <div>
          <TweetForm  isLoading={isLoading} setIsLoading={setIsLoading}/>  
          <TweetList  isLoading={isLoading} setIsLoading={setIsLoading}/>
        </div>
    )
}

export default HomePage;