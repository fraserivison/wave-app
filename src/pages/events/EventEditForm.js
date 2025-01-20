import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function EventEditForm() {
  const [errors, setErrors] = useState({});
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    genre: "",
    date: "",
    location: "",
  });

  const { id } = useParams(); // Extract the event ID from the URL
  const history = useHistory();

  // Log the id to check if it's correct
  useEffect(() => {
    console.log("Event ID:", id);
    const fetchEventData = async () => {
      try {
        const { data } = await axiosReq.get(`/events/${id}/`);
        setEventData({
          name: data.name,
          description: data.description,
          genre: data.genre,
          date: data.date,
          location: data.location,
        });
      } catch (err) {
        console.log(err);
        if (err.response?.status !== 401) {
          setErrors(err.response?.data);
        }
      }
    };

    if (id) {
      fetchEventData();
    } else {
      console.log("No event ID provided");
    }
  }, [id]);

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting event data:", eventData);
    try {
      // Ensure the id is passed correctly in the URL for the PUT request
      const { data } = await axiosReq.put(`/events/${id}/`, eventData); 
      history.push(`/events/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container
        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
      >
        <h1 className="text-center">Edit Event</h1>
        <Form.Group>
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={eventData.name}
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
            value={eventData.description}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.description?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Control
            as="select"
            name="genre"
            value={eventData.genre}
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
            value={eventData.date}
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
            value={eventData.location}
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
            Save
          </Button>
        </div>
      </Container>
    </Form>
  );
}

export default EventEditForm;

