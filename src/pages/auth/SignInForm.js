import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

import { axiosReq } from "../../api/axiosDefaults"; // <--- use the axios instance with withCredentials

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
      const { data } = await axiosReq.post(
        "/dj-rest-auth/login/",
        signInData,
        { withCredentials: true } // ensure cookies are sent/received cross-site
      );
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
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={styles.heroSection}>
      <Row className={styles.Row}>
        <Col
          md={6}
          className={`d-none d-md-flex flex-column align-items-center justify-content-center ${styles.ImageContainer}`}
        >
          <h1 className={styles.Branding}>
            <i
              className="fa-solid fa-headphones-simple"
              style={{ color: "#f7f7f7", marginRight: "20px", fontSize: "4rem" }}
            ></i>
            Wave
          </h1>
          <p className={styles.Slogan}>
            The #1 Platform to listen, share and discover.
          </p>
        </Col>
        <Col md={6} className="d-flex justify-content-center">
          <Container className={styles.SignInCol}>
            <h2 className={styles.Header}>Sign In</h2>
            <Form onSubmit={handleSubmit}>
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

              <Button className={styles.CustomButton} type="submit">
                Sign In
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>

            <Link className={styles.Link} to="/signup">
              Don't have an account? <span>Sign up now!</span>
            </Link>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default SignInForm;
