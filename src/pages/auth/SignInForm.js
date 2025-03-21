import React, { useState } from "react";
import axios from "axios";

import heroImage from "../../assets/hero.png";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form with data:", signInData);

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      console.log("Login successful, received data:", data);

      setCurrentUser(data.user);
      setTokenTimestamp(data);
      console.log("User set in context:", data.user);

      history.push("/discover");
    } catch (err) {
      console.error("Login failed with error:", err);

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

  const handleChange = (event) => {
    console.log("Input changed:", event.target.name, "=", event.target.value);

    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Row className={styles.Row}>
      {/* Sign In Form */}
      <Col md={6} className="d-flex justify-content-center">
        <Container className={styles.SignInCol}>
          <h2 className={styles.Header}>Sign In</h2>
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
            <Form.Group controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className={styles.Input}
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}

            {/* Sign In Button */}
            <Button className={styles.CustomButton} type="submit">
              Sign In
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="warning" className="mt-3">
                {message}
              </Alert>
            ))}
          </Form>

          {/* Sign Up Link */}
          <Link className={styles.Link} to="/signup">
            Don't have an account? <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>

      {/* Image Section */}
      <Col
        md={6}
        className={`d-none d-md-flex align-items-center ${styles.ImageContainer}`}
      >
        <Image
          className={appStyles.FillerImage}
          src={heroImage}
          alt="Hero"
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Col>
    </Row>
  );
}

export default SignInForm;
