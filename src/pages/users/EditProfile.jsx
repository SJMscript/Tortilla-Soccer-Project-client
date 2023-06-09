import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editProfileService, profileService } from "../../services/profile.services";
import { uploadImageService } from "../../services/upload.services";
import styles from "../../css/editProfile.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function EditProfile() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    profileImg: ""
  });
  const [isLoading, setIsLoading] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const userProfile = await profileService();

      setUserData({
        username: userProfile.data.username,
        email: userProfile.data.email,
        oldPassword: "",
        newPassword: "",
        profileImg: userProfile.data.profileImg
      });
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);
      setImageUrl(response.data.imageUrl);
      setUserData((prevData) => ({
        ...prevData,
        profileImg: response.data.imageUrl // Set the profile image URL in the userData state
      }));
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await editProfileService(userData);
      navigate("/user/profile");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className={styles.bodyEditProfile}>
      <h3 className={styles.h3Profile}>Edit Profile</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className={styles.formProfile}>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={handleInputChange}
            value={userData.username}
          />
        </Form.Group>
        <br />
        <Form.Group className={styles.formProfile}>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleInputChange}
            value={userData.email}
          />
        </Form.Group>
        <br />
        <Form.Group className={styles.formProfile}>
          <Form.Label htmlFor="oldPassword">Old Password</Form.Label>
          <Form.Control
            type="password"
            name="oldPassword"
            onChange={handleInputChange}
            value={userData.oldPassword}
          />
        </Form.Group>
        <br />
        <Form.Group className={styles.formProfile}>
          <Form.Label htmlFor="newPassword">New Password</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            onChange={handleInputChange}
            value={userData.newPassword}
          />
        </Form.Group>
        <br />
        <Form.Group className={styles.formProfile}>
          <Form.Label htmlFor="profileImg">Profile Image</Form.Label>
          <Form.Control
            type="file"
            name="profileImg"
            onChange={handleFileUpload}
            accept="image/*"
            disabled={isUploading}
          />
        </Form.Group>
        <br />
        {isUploading ? <h3>... Uploading Image</h3> : null}
        {userData.profileImg && <img src={userData.profileImg} alt="Profile" width={200} />}
        <br />
        <Button className={styles.btnEditProfile} variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default EditProfile;
