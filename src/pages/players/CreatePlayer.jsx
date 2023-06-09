import { useState } from "react";
import { createPlayerService } from "../../services/players.services";
import { uploadImageService } from "../../services/upload.services";
import { RingLoader } from "react-spinners";
import styles from "../../css/createPlayer.module.css"
import style from "../../css/editProfile.module.css"
import Form from "react-bootstrap/Form"

import { useNavigate } from "react-router-dom";

function CreatePlayer() {
  const navigate = useNavigate();

  const [playerName, setPlayerName] = useState("");
  const [playerAge, setPlayerAge] = useState(0);
  const [playerPosition, setPlayerPosition] = useState("");
  const [playerSkillfulLeg, setPlayerSkillfulLeg] = useState("");
  const [playerImageUrl, setPlayerImageUrl] = useState("");
  const [playerMarketValue, setPlayerMarketValue] = useState(0);
  const [playerCurrentTeam, setPlayerCurrentTeam] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleNameChange = (e) => setPlayerName(e.target.value);
  const handleAgeChange = (e) => setPlayerAge(e.target.value);
  const handlePositionChange = (e) => setPlayerPosition(e.target.value);
  const handleSkillfulLegChange = (e) => setPlayerSkillfulLeg(e.target.value);
  const handleImageUrlChange = (e) => setPlayerImageUrl(e.target.value);
  const handleCurrentTeamChange = (e) => setPlayerCurrentTeam(e.target.value);
  const handleMarketValueChange = (e) => setPlayerMarketValue(e.target.value);

  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) {
      return;
    }

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", event.target.files[0]);

    try {
      const response = await uploadImageService(uploadData);
      setPlayerImageUrl(response.data.imageUrl);
      setIsUploading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createPlayer = await createPlayerService({
        name: playerName,
        age: playerAge,
        playerPosition: playerPosition,
        skillfulLeg: playerSkillfulLeg,
        imageUrl: playerImageUrl,
        marketValue: playerMarketValue,
        currentTeam: playerCurrentTeam
      });
      console.log("response", createPlayer);
      navigate("/players/list");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div className={styles.addPlayerFormMain}>
    <div className={styles.addPlayerForm}>
      <h3 className={styles.h3TitleCreatePlayer}>Add a new Player</h3>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Form.Group className={styles.formProfile} >
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" onChange={handleNameChange} value={playerName} />
        </Form.Group>
        <br />
        <Form.Group className={styles.formProfile} >
        <label htmlFor="age">Age: </label>
        <input type="number" name="age" onChange={handleAgeChange} value={playerAge} />
        </Form.Group>
        <br />
        <Form.Group className={styles.formProfile} >
        <label htmlFor="position">Position: </label>
        <input
          type="text"
          name="position"
          onChange={handlePositionChange}
          value={playerPosition}
        />
        </Form.Group>
        <br />
        <Form.Group className={styles.formProfile} >
        <label htmlFor="skillfulLeg">Skillful Leg: </label>
        <input
          type="text"
          name="skillfulLeg"
          onChange={handleSkillfulLegChange}
          value={playerSkillfulLeg}
        />
        </Form.Group>
        <br />
        <Form.Group className={styles.formProfile} >
        <label htmlFor="imageUrl">Image: </label>
        <input
          type="file"
          name="imageUrl"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        </Form.Group>
        <br />

        {isUploading ? <h3>... uploading image</h3> : null}
        {playerImageUrl ? (
          <div>
            <img src={playerImageUrl} alt="img" width={200} />
          </div>
        ) : null}
        <Form.Group className={styles.formProfile} >
        <label htmlFor="currentTeam">Current Team: </label>
        <input
          type="text"
          name="currentTeam"
          onChange={handleCurrentTeamChange}
          value={playerCurrentTeam}
        />
        </Form.Group>
        <br />
        <Form.Group className={styles.formProfile} >
        <label htmlFor="marketValue">Market Value: </label>
        <input
          type="text"
          name="marketValue"
          onChange={handleMarketValueChange}
          value={playerMarketValue}
        />
        </Form.Group>
        <br />

        <button className={style.btnEditProfile} style={{color: "white"}} type="submit">Add Here!</button>
      </form>
    </div>
    </div>
  );
}

export default CreatePlayer;
