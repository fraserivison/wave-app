import React, { useRef, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/TrackCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import Upload from "../../assets/upload.png";

function TrackEditForm() {
  const [errors, setErrors] = useState({});
  const [trackData, setTrackData] = useState({
    title: "",
    genre: "",
    album_cover: "",
  });
  const { title, genre, album_cover } = trackData;

  const albumCoverInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/tracks/${id}/`);
        const { title, genre, album_cover } = data;
        setTrackData({ title, genre, album_cover });
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("genre", genre);
    if (albumCoverInput.current?.files[0]) {
      formData.append("album_cover", albumCoverInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/tracks/${id}/`, formData);
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
      <h1>Update a track</h1>
      {/* Title Field */}
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

      {/* Album Cover Upload */}
      <Form.Group>
        <Form.Label>Album Cover</Form.Label>
        <div className="d-flex justify-content-center">
          {album_cover ? (
            <Image src={album_cover} rounded className={styles.ImageSmall} />
          ) : (
            <Image src={Upload} rounded className={styles.ImageSmall} />
          )}
        </div>
        <Form.File
          id="album-cover-upload"
          accept="image/*"
          onChange={handleChangeImage}
          ref={albumCoverInput}
        />
        <Button
          className={`${btnStyles.Button} ${btnStyles.Blue} ${btnStyles.CustomButton} mt-2`}
          onClick={() => albumCoverInput.current?.click()}
        >
          Update Album Cover
        </Button>
      </Form.Group>
      {errors?.album_cover?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
    </div>
  );

  return (
    <Form onSubmit={handleSubmit} className={`${styles.FormContainer}`}>
      <div className="d-flex flex-column justify-content-center">
        {textFields}
        <div className="text-center mt-3">
          <Button
            className={`${btnStyles.Button} ${btnStyles.Blue} ${btnStyles.CustomButton} mx-2`}
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Blue} ${btnStyles.CustomButton} mx-2`}
            type="submit"
          >
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default TrackEditForm;

