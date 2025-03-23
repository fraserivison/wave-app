import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useProfile } from "../../contexts/ProfileContext";
import { Spinner } from "react-bootstrap"; // Importing Spinner component

function ProfileEditForm() {
  const [errors, setErrors] = useState({});
  const [profileData, setProfileData] = useState({
    dj_name: "",
    bio: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(true); // New loading state
  const { dj_name, bio, image } = profileData;
  const imageInput = useRef(null);
  const { id } = useParams();
  const history = useHistory();

  const { setProfile } = useProfile();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}/`);
        setProfileData({
          dj_name: data.dj_name,
          bio: data.bio,
          image: data.image,
        });
        setProfile(data);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.log(err);
        setIsLoading(false); // Set loading to false if there's an error
      }
    };
    fetchProfileData();
  }, [id, setProfile]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("dj_name", dj_name);
    formData.append("bio", bio);
    if (imageInput.current.files.length) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setProfile(data);
      history.push(`/profiles/${data.id}/`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <h1>Update your Profile</h1>
      {/* Profile Image Upload */}
      <Form.Group className="text-center">
        {image ? (
          <>
            <figure>
              <Image className={appStyles.Image} src={image} rounded />
            </figure>
            <div>
              <Form.Label
                className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                htmlFor="image-upload"
              >
                Change the image
              </Form.Label>
            </div>
          </>
        ) : (
          <Form.Label
            className="d-flex justify-content-center"
            htmlFor="image-upload"
          >
            <span>Click or tap to upload an image</span>
          </Form.Label>
        )}

        <Form.File
          id="image-upload"
          accept="image/*"
          onChange={handleChangeImage}
          ref={imageInput}
        />
      </Form.Group>
      {errors?.image?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>DJ Name</Form.Label>
        <Form.Control
          type="text"
          name="dj_name"
          value={dj_name}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.dj_name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="bio"
          value={bio}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.bio?.map((message, idx) => (
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
      <div className="d-flex justify-content-center">
        <div
          className="py-2 p-0 p-md-2"
          style={{ maxWidth: "800px", width: "100%" }}
        >
          <div
            className={`${appStyles.Content} d-flex flex-column justify-content-center`}
          >
            {isLoading ? (
              <div className="text-center">
                <Spinner animation="border" />
              </div>
            ) : (
              textFields
            )}
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ProfileEditForm;
