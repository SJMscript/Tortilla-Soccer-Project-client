// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { editProfileService, profileService } from "../../services/profile.services";

// function EditProfile() {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     oldPassword: "",
//     newPassword: "",
//     profileImg: ""
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getUserData();
//   }, []);

//   const getUserData = async () => {
//     try {
//       const userProfile = await profileService(); // Utilizamos el servicio para obtener los datos del perfil del usuario

//       // Establecer los valores iniciales en el estado `userData`
//       setUserData({
//         username: userProfile.username,
//         email: userProfile.email,
//         oldPassword: "",
//         newPassword: "",
//         profileImg: ""
//       });
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       await editProfileService(userData); // Utilizamos el servicio para editar el perfil del usuario
//       navigate("/user/profile");
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }

//     setIsLoading(false);
//   };

//   if (isLoading) {
//     return <h3>Loading...</h3>;
//   }

//   return (
//     <div>
//       <h3>Edit Profile</h3>

//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">Username</label>
//         <input
//           type="text"
//           name="username"
//           onChange={handleInputChange}
//           value={userData.username}
//         />
//         <br />
//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           name="email"
//           onChange={handleInputChange}
//           value={userData.email}
//         />
//         <br />
//         <label htmlFor="oldPassword">Old Password</label>
//         <input
//           type="password"
//           name="oldPassword"
//           onChange={handleInputChange}
//           value={userData.oldPassword}
//         />
//         <br />
//         <label htmlFor="newPassword">New Password</label>
//         <input
//           type="password"
//           name="newPassword"
//           onChange={handleInputChange}
//           value={userData.newPassword}
//         />
//         <br />
//         <label htmlFor="profileImg">Profile Image</label>
//         <input
//           type="file"
//           name="profileImg"
//           onChange={handleInputChange}
//           accept="image/*"
//         />
//         <br />
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// }

// export default EditProfile;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editProfileService, profileService} from "../../services/profile.services";
import { uploadImageService } from "../../services/upload.services";

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

    //   setUserData((prevData) => ({
    //     ...prevData,
    //     profileImg: response.data.imageUrl // Set the profile image URL in the userData state
    //   }));

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
    <div>
      <h3>Edit Profile</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          onChange={handleInputChange}
          value={userData.username}
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          value={userData.email}
        />
        <br />
        <label htmlFor="oldPassword">Old Password</label>
        <input
          type="password"
          name="oldPassword"
          onChange={handleInputChange}
          value={userData.oldPassword}
        />
        <br />
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          name="newPassword"
          onChange={handleInputChange}
          value={userData.newPassword}
        />
        <br />
        <label htmlFor="profileImg">Profile Image</label>
        <input
          type="file"
          name="profileImg"
          onChange={handleFileUpload}
          accept="image/*"
          disabled={isUploading}
        />
        <br />
        {isUploading ? <h3>... Uploading Image</h3> : null}
        {imageUrl && <img src={imageUrl} alt="Profile" width={200} />} 
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProfile;
