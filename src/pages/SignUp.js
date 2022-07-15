import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import app from "../DB/base";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = useCallback(async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <h1>Sign up</h1>
      <Form onSubmit={handleSignUp}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control name="email" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
