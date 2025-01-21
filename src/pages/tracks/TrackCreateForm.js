import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";

import Upload from "../../assets/upload.png";

import styles from "../../styles/TrackCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function TrackCreateForm() {
  const [errors, setErrors] = useState({});
  const [trackData, setTrackData] = useState({
    title: "",
    genre: "",
    audio_file: "",
    album_cover: "",
  });
  const { title, genre, audio_file, album_cover } = trackData;

  const albumCoverInput = useRef(null);
  const audioFileInput = useRef(null);

  const history = useHistory();

  const handleChange = (event) => {
    setTrackData({
      ...trackData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(album_cover);
      setTrackData({
        ...trackData,
        album_cover: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleChangeAudio = (event) => {
    if (event.target.files.length) {
      setTrackData({
        ...trackData,
        audio_file: event.target.files[0].name,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("genre", genre);
    formData.append("album_cover", albumCoverInput.current.files[0]);
    formData.append("audio_file", audioFileInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/tracks/", formData);
      history.push(`/tracks/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <h1 className="text-center">Add Track</h1>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
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
          Create
        </Button>
      </div>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            {/* Audio File and Album Cover Uploads Side by Side */}
            <Row className="mb-4">
              <Col md={6} className="text-center">
                {audio_file ? (
                  <>
                    <div>
                      <audio controls>
                        <source src={audio_file} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    <div>
                      <Form.Label
                        className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                        htmlFor="audio-upload"
                      >
                        Change the audio file
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="audio-upload"
                  >
                    <Asset
                      src={Upload}
                      message="Click or tap to upload an audio file"
                    />
                  </Form.Label>
                )}

                <Form.File
                  id="audio-upload"
                  accept="audio/*"
                  onChange={handleChangeAudio}
                  ref={audioFileInput}
                />
              </Col>

              <Col md={6} className="text-center">
                {album_cover ? (
                  <>
                    <figure>
                      <Image
                        className={appStyles.Image}
                        src={album_cover}
                        rounded
                      />
                    </figure>
                    <div>
                      <Form.Label
                        className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                        htmlFor="album-cover-upload"
                      >
                        Change the album cover
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="album-cover-upload"
                  >
                    <Asset
                      src={Upload}
                      message="Click or tap to upload an album cover"
                    />
                  </Form.Label>
                )}

                <Form.File
                  id="album-cover-upload"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={albumCoverInput}
                />
              </Col>
            </Row>

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TrackCreateForm;

