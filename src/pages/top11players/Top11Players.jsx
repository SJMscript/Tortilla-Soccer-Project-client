import { useState, useEffect } from "react";
import { createTop11Service } from "../../services/top11Players.services";
import { playersListService } from "../../services/players.services";
import { useNavigate, useParams } from "react-router-dom";

function Top11Players() {
  const [playersList, setPlayersList] = useState(null);
  const [top11PlayersList, setTop11PlayersList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTop11PlayersData();
  }, []);

  const getTop11PlayersData = async () => {
    try {
      // console.log(playerId, "playerId");
      const playersList = await playersListService();
      console.log(playersList, "response");
      setPlayersList(playersList.data);
      const top11Player = await createTop11Service();
      console.log(top11Player, "response");
      setTop11PlayersList(top11Player.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Our 11 choosen</h3>

      {top11PlayersList.map((eachPlayer) => {
        return (
          <div key={eachPlayer._id}>
            <li>
              {eachPlayer.name}
              {eachPlayer.imageUrl}
              {eachPlayer.postion}
            </li>
          </div>
        );
      })}

      {playersList.map((eachPlayer) => {
        return (
          <div key={eachPlayer._id}>
            <h5>{eachPlayer.name}</h5>
          </div>
        );
      })}
    </div>
  );
}

export default Top11Players;
