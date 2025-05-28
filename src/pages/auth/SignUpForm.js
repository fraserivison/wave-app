import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/SignInUpForm.module.css";

import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    console.log("Input changed:", event.target.name, "=", event.target.value);

    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form with data:", signUpData);

    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      console.log("Registration successful, redirecting to sign-in page");
      history.push("/signin");
    } catch (err) {
      console.error("Registration failed with error:", err);

      if (err.response) {
        console.error("Error response data:", err.response.data);
      } else {
        console.error("No response received or error unrelated to response");
      }

      setErrors(
        err.response?.data || {
          non_field_errors: ["An unexpected error occurred."],
        }
      );
    }
  };

  return (
    <div className={styles.heroSection}>
    <Row className={styles.Row}>
      {/* Image Section */}
      <Col
        md={6}
        className={`d-none d-md-flex flex-column align-items-center justify-content-center ${styles.ImageContainer}`}
      >
        <h1 className={styles.Branding}>
          <i
            className="fa-solid fa-headphones-simple"
            style={{ color: "#f7f7f7", marginRight: "20px", fontSize: "4rem" }}
          ></i>
          wave
        </h1>
        <p className={styles.Slogan}>
          The #1 Platform to listen, share and discover.
        </p>
      </Col>
      {/* Sign Up Form */}
      <Col md={6} className="d-flex justify-content-center">
        <Container className={styles.SignInCol}>
          {" "}
          {/* Made consistent */}
          <h2 className={styles.Header}>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            {/* Username Input */}
            <Form.Group controlId="username">
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                className={styles.Input}
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            {/* Password Input */}
            <Form.Group controlId="password1">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                className={styles.Input}
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            {/* Confirm Password Input */}
            <Form.Group controlId="password2">
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                className={styles.Input}
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            {/* Sign Up Button */}
            <Button className={styles.CustomButton} type="submit">
              Sign Up
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>
          {/* Sign In Link */}
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
    </Row>
  </div>
  );
};

export default SignUpForm;
