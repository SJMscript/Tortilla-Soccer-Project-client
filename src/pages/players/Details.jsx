import { useState, useEffect } from "react";
import { playerDetailsService } from "../../services/players.services";
import { useParams, useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { uploadImageService } from "../../services/upload.services";

function Details() {
  const [playerDetails, setPlayerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const { playerId } = useParams();
  console.log(playerId, "a");

  useEffect(() => {
    getPlayerDetailData();
    console.log(playerId)
  }, []);

  const getPlayerDetailData = async () => {
    try {
      const OnePlayerDetails = await playerDetailsService(playerId);
      console.log("response OnePlayerDetails", OnePlayerDetails);
      setPlayerDetails(OnePlayerDetails.data);
      setIsLoading(false);
      console.log("playerDetails", OnePlayerDetails.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false); 
    }
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
      setIsUploading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h1>Player Details</h1>

      {playerDetails ? (
        <div>
          <h4>{playerDetails.name}</h4>
          <br />
          <p>{playerDetails.age}</p>
          <br />
          <p>{playerDetails.currentTeam}</p>
          <p>{playerDetails.skillfulLeg}</p>
          <br />

          <div>
            <label>Image: </label>
            <input
              type="file"
              name="image"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
            {isUploading ? <h3>... uploading image</h3> : null}
            {imageUrl ? (
              <div>
                <img src={imageUrl} alt="img" width={200} />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <h3>No player details found</h3>
      )}
    </div>
  );
}

export default Details;
