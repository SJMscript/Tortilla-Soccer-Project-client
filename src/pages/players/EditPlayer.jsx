// import { useEffect, useState } from "react";
// import { updatePlayerService, playerDetailsService } from "../../services/players.services";
// import { uploadImageService } from "../../services/upload.services";
// import { RingLoader } from "react-spinners";
// import { useNavigate, useParams } from "react-router-dom";

// function EditPlayer() {
//   const { playerId } = useParams();
//   const navigate = useNavigate();

//   const [playerData, setPlayerData] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUploading, setIsUploading] = useState(false);

//   useEffect(() => {
//     getPlayerData();
//   }, []);

//   const getPlayerData = async () => {
//     try {
//       const response = await playerDetailsService(playerId);
//       setPlayerData(response.data);
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setPlayerData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleFileUpload = async (event) => {
//     if (!event.target.files[0]) {
//       return;
//     }

//     setIsUploading(true);

//     const uploadData = new FormData();
//     uploadData.append("image", event.target.files[0]);

//     try {
//       const response = await uploadImageService(uploadData);
//       setPlayerData((prevData) => ({
//         ...prevData,
//         imageUrl: response.data.imageUrl
//       }));
//       setIsUploading(false);
//     } catch (error) {
//       navigate("/error");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await updatePlayerService(playerId, playerData);
//       navigate("/players/list");
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };

//   if (isLoading) {
//     return <h3>Loading...</h3>;
//   }

//   return (
//     <div className="EditPlayerPage">
//       <h3>Edit Player</h3>

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <label htmlFor="name">Name</label>
//         <input type="text" name="name" onChange={handleInputChange} value={playerData.name} />
//         <br />
//         <label htmlFor="age">Age</label>
//         <input type="number" name="age" onChange={handleInputChange} value={playerData.age} />
//         <br />
//         <label htmlFor="position">Position</label>
//         <input
//           type="text"
//           name="position"
//           onChange={handleInputChange}
//           value={playerData.position}
//         />
//         <br />
//         <label htmlFor="skillfulLeg">Skillful Leg</label>
//         <input
//           type="text"
//           name="skillfulLeg"
//           onChange={handleInputChange}
//           value={playerData.skillfulLeg}
//         />
//         <br />
//         <label htmlFor="imageUrl">Image</label>
//         <input
//           type="file"
//           name="imageUrl"
//           onChange={handleFileUpload}
//           disabled={isUploading}
//         />
//         <br />

//         {isUploading ? <h3>... uploading image</h3> : null}
//         {playerData.imageUrl ? (
//           <div>
//             <img src={playerData.imageUrl} alt="img" width={200} />
//           </div>
//         ) : null}

//         <label htmlFor="currentTeam">Current Team</label>
//         <input
//           type="text"
//           name="currentTeam"
//           onChange={handleInputChange}
//           value={playerData.currentTeam}
//         />
//         <br />
//         <label htmlFor="marketValue">Market Value</label>
//         <input
//           type="text"
//           name="marketValue"
//           onChange={handleInputChange}
//           value={playerData.marketValue}
//         />
//         <br />

//         <button type="submit">Update Player</button>
//       </form>
//     </div>
//   );
// }

// export default EditPlayer;

import { useEffect, useState } from "react";
import { updatePlayerService, playerDetailsService } from "../../services/players.services";
import { uploadImageService } from "../../services/upload.services";
import { RingLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

function EditPlayer() {
  const { playerId } = useParams();
  const navigate = useNavigate();

  const [playerData, setPlayerData] = useState({
    name: "",
    age: "",
    position: "",
    skillfulLeg: "",
    imageUrl: "",
    currentTeam: "",
    marketValue: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    getPlayerData();
  }, []);

  const getPlayerData = async () => {
    try {
      const response = await playerDetailsService(playerId);
      setPlayerData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPlayerData((prevData) => ({
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
      setPlayerData((prevData) => ({
        ...prevData,
        imageUrl: response.data.imageUrl
      }));
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePlayerService(playerId, playerData);
      navigate("/players/list");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="EditPlayerPage">
      <h3>Edit Player</h3>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleInputChange} value={playerData.name} />
        <br />
        <label htmlFor="age">Age</label>
        <input type="number" name="age" onChange={handleInputChange} value={playerData.age} />
        <br />
        <label htmlFor="position">Position</label>
        <input
          type="text"
          name="position"
          onChange={handleInputChange}
          value={playerData.position}
        />
        <br />
        <label htmlFor="skillfulLeg">Skillful Leg</label>
        <input
          type="text"
          name="skillfulLeg"
          onChange={handleInputChange}
          value={playerData.skillfulLeg}
        />
        <br />
        <label htmlFor="imageUrl">Image</label>
        <input
          type="file"
          name="imageUrl"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        <br />

        {isUploading ? <h3>... uploading image</h3> : null}
        {playerData.imageUrl ? (
          <div>
            <img src={playerData.imageUrl} alt="img" width={200} />
          </div>
        ) : null}

        <label htmlFor="currentTeam">Current Team</label>
        <input
          type="text"
          name="currentTeam"
          onChange={handleInputChange}
          value={playerData.currentTeam}
        />
        <br />
        <label htmlFor="marketValue">Market Value</label>
        <input
          type="text"
          name="marketValue"
          onChange={handleInputChange}
          value={playerData.marketValue}
        />
        <br />

        <button type="submit">Update Player</button>
      </form>
    </div>
  );
}

export default EditPlayer;