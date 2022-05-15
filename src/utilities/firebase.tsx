import { createContext } from 'react'
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBr7R4S3pmiuPaa9x3QjqGkaVG6lV-czA0",
  authDomain: "quacker-6d53d.firebaseapp.com",
  projectId: "quacker-6d53d",
  storageBucket: "quacker-6d53d.appspot.com",
  messagingSenderId: "1002604880173",
  appId: "1:1002604880173:web:35b5d02f4fdb8dbc35f3a4"
};

export const FirebaseContext = createContext<any | null>(null);

const Firebase:React.FC = ({ children }): JSX.Element => {
    const app = initializeApp(firebaseConfig);
    
    return (
        <FirebaseContext.Provider value={app}>
            { children }
        </FirebaseContext.Provider>
    )
}

export default Firebase;