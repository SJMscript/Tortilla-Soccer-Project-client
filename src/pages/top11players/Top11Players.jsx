import { useState, useEffect } from "react";
import { createTop11Service } from "../../services/top11Players.services";
import { playersListService } from "../../services/players.services";
import { useNavigate, useParams } from "react-router-dom";

function Top11Players() {
  const [playersList, setPlayersList] = useState([]);
  const [top11PlayersList, setTop11PlayersList] = useState([]);

  useEffect(() => {
    getPlayersListData();
  }, []);

  const getPlayersListData = async () => {
    try {
      const response = await playersListService();
      console.log(response, "response");
      setPlayersList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToTop11PlayersList = (player) => {
    if (top11PlayersList.length < 11 && !isPlayerInTop11(player)) {
      setTop11PlayersList((prevList) => [...prevList, player]);
    }
  };

  const isPlayerInTop11 = (player) => {
    return top11PlayersList.some((p) => p._id === player._id);
  };

  return (
    <div>
      <h3>Our 11 chosen</h3>

      {top11PlayersList.map((eachPlayer) => (
        <div className="top11-card" key={eachPlayer._id}>
          <li>
            <p>{eachPlayer.name}</p>
            {eachPlayer.imageUrl && (
              <div>
                <img src={eachPlayer.imageUrl} alt="Player" width={200} />
              </div>
            )}
            <p>{eachPlayer.position}</p>
          </li>
        </div>
      ))}

      <h3>All Players</h3>

      {playersList.map((eachPlayer) => (
        <div className="player-card" key={eachPlayer._id}>
          <h5>{eachPlayer.name}</h5>
          <p>{eachPlayer.position}</p>
          {!isPlayerInTop11(eachPlayer) && (
            <button onClick={() => addToTop11PlayersList(eachPlayer)}>
              Add to Top 11
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Top11Players;
