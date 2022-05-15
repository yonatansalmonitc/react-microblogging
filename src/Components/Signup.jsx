import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Signup(props) {
  const { activeUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function registerUser() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          let navigate = useNavigate;
          activeUser(true)
          setEmail("");
          setPassword("");
          navigate("/");
          const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }
  function handleChange(event) {
    setEmail(event.target.value)
    setPassword(event.target.value)
  }

  return (
    <Container>
      <h1 className="d-6 text-white font-weight-normal">Sign-Up</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="text-white font-weight-light">
            Email address
          </Form.Label>
          <div className="inputData">
            <Form.Control type="email" placeholder="Enter email" onChange={(event)=> setEmail(event.target.value)} value={email}/>
          </div>
          <Form.Text className="text-muted ">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword" >
          <Form.Label className="text-white font-weight-light">
            Password
          </Form.Label>
          <div className="inputData">
            <Form.Control
              type="password"
              placeholder="Enter new password"
              autoComplete="on"
              value={password}
              onChange={(event)=> setPassword(event.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            className="text-muted"
            type="checkbox"
            label="Check me out"
          />
        </Form.Group>
        <div className="d-flex flex-row-reverse">
          <Button
            variant="primary"
            type="submit"
            className=""
            onClick={registerUser}
          >
            SignUp
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default Signup;
