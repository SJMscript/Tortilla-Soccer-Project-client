import { useEffect, useState } from "react";
import { deletePlayerService } from "../../services/players.services";
import { useNavigate, useParams } from "react-router-dom";

function DeletePlayer() {
  const { playerId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    deletePlayer();
  }, []);

  const deletePlayer = async () => {
    try {
      await deletePlayerService(playerId);
      setIsLoading(false);
      navigate("/players/list");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return <h3>Player has been deleted.</h3>;
}

export default DeletePlayer;
