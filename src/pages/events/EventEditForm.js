import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";  // Import the Spinner component
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/EventCreateEditForm.module.css";

function EventEditForm() {
  const [errors, setErrors] = useState({});
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    genre: "",
    date: "",
    location: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const { name, description, genre, date, location } = eventData;

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}/`);
        setEventData(data);
      } catch (err) {
        console.log(err);
        if (err.response?.status !== 401) {
          setErrors(err.response?.data);
        }
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };

    fetchEventData();
  }, [id]);

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosReq.put(`/events/${id}/`, eventData);
      history.push(`/events/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <h1>Update an event</h1>
      <Form.Group>
        <Form.Label>Event Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Genre Field */}
      <Form.Group>
        <Form.Label>Genre</Form.Label>
        <Form.Control
          as="select"
          name="genre"
          value={genre}
          onChange={handleChange}
        >
          <option value="">Select a genre</option>
          <option value="house">House</option>
          <option value="tech_house">Tech House</option>
          <option value="trance">Trance</option>
          <option value="dubstep">Dubstep</option>
          <option value="drum_and_bass">Drum and Bass</option>
          <option value="techno">Techno</option>
          <option value="electro">Electro</option>
          <option value="progressive_house">Progressive House</option>
          <option value="chillout">Chillout</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>
      {errors?.genre?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Date and Time</Form.Label>
        <Form.Control
          type="datetime-local"
          name="date"
          value={date}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={location}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.location?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <div className="text-center">
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          onClick={() => history.goBack()}
        >
          Cancel
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue}`}
          type="submit"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Container
        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`} // Apply the same container styles
      >
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" /> {/* Loading Spinner */}
        </div>
      </Container>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container
        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`} // Apply the same container styles
      >
        {textFields}
      </Container>
    </Form>
  );
}

export default EventEditForm;


