import React, {useState} from "react";
import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import  {auth, provider} from "../firebase/firebase";
import {signInWithPopup} from 'firebase/auth';
import { useNavigate, Link } from "react-router-dom" 
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleButton } from 'react-google-button';

function Login({setActiveUser}) {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
 function signInWithGoogle() {
    signInWithPopup(auth, provider).then((result) => {
        localStorage.setItem("isAuth", true)
        setActiveUser(true)
        navigate("/")
    })
  }  
  function emailLogin()  {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    setActiveUser(true)
     navigate("/")
  })
 }
   
 return (
    <Container>
         <h1 className="d-6 text-white font-weight-normal">Login</h1>
      <Form >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-white font-weight-light">Email address or <Link to="/Signup">Signup</Link></Form.Label>
          <div className="inputData">
          <Form.Control type="email" placeholder="Enter email"  onChange={(event)=>setEmail(event.target.value)} value = {email} />
          </div>
          <Form.Text className="text-muted ">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-white font-weight-light">Password</Form.Label>
          <div className="inputData">
          <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)} value = {password}/>
          </div> 
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check className="text-muted" type="checkbox" label="Check me out" />
        </Form.Group>
        <div className="d-flex flex-row-reverse test">
            <Button variant="primary" type="button" onClick={()=>emailLogin()}>Email Sign In</Button>
        <GoogleButton variant="primary" type="dark" className="mx-5" onClick={() => signInWithGoogle()}>
          Sign  in with Google
        </GoogleButton>
        </div>
      </Form>
    </Container>
  );
}

export default Login;
