import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function EventEditForm() {
  const [errors, setErrors] = useState({});
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    genre: "",
    date: "",
    location: "",
  });
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
      <h2>Update an event</h2>
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

      <Form.Group>
        <Form.Label>Genre</Form.Label>
        <Form.Control
          as="select"
          name="genre"
          value={genre}
          onChange={handleChange}
        >
          <option value="">Select a genre</option>
          {/* Add genre options */}
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

  return (
    <Form onSubmit={handleSubmit}>
      <div className="d-md-flex">
        <div className="py-2 p-0 p-md-2">
          <div
            className={`${appStyles.Content} d-flex flex-column justify-content-center`}
          >
            {textFields}
          </div>
        </div>
      </div>
    </Form>
  );
}

export default EventEditForm;
