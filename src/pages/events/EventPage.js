import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import eventStyles from "../../Event.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: event }] = await Promise.all([
          axiosReq.get(`/events/${id}`),
        ]);
        setEvent({ results: [event] });
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className={`${eventStyles.eventPageContainer} py-2 p-0 p-lg-2`} lg={8}>
        <div className={eventStyles.eventContent}>
          <h2 className={eventStyles.eventTitle}>{event.results[0]?.title}</h2>
          <p className={eventStyles.eventDate}>{event.results[0]?.date}</p>
          <img
            src={event.results[0]?.image}
            alt={event.results[0]?.title}
            className={eventStyles.eventImage}
          />
          <p className={eventStyles.eventDescription}>
            {event.results[0]?.description}
          </p>
        </div>
        <Container className={appStyles.Content}>
          <div className={eventStyles.eventComments}>Comments</div>
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        {/* Sidebar or other content can go here */}
      </Col>
    </Row>
  );
}

export default EventPage;

