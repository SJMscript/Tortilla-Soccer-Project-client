import { useState, useEffect } from "react";
import { playersListService } from "../../services/players.services";
import { useNavigate } from "react-router-dom";

function Top11Players() {
  const [playersList, setPlayersList] = useState([]);
  const [top11PlayersList, setTop11PlayersList] = useState([]);
  const [goalkeeperCount, setGoalkeeperCount] = useState(0);
  const [defenseCount, setDefenseCount] = useState(0);
  const [midfielderCount, setMidfielderCount] = useState(0);
  const [forwardCount, setForwardCount] = useState(0);
  const navigate = useNavigate();

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
      if (player.playerPosition === "goalkeeper" && goalkeeperCount >= 1) {
        return;
      }
      if (player.playerPosition === "defense" && defenseCount >= 4) {
        return;
      }
      if (player.playerPosition === "midfielder" && midfielderCount >= 3) {
        return;
      }
      if (player.playerPosition === "forward" && forwardCount >= 3) {
        return;
      }

      setTop11PlayersList((prevList) => [...prevList, player]);

      if (player.playerPosition === "goalkeeper") {
        setGoalkeeperCount((count) => count + 1);
      } else if (player.playerPosition === "defense") {
        setDefenseCount((count) => count + 1);
      } else if (player.playerPosition === "midfielder") {
        setMidfielderCount((count) => count + 1);
      } else if (player.playerPosition === "forward") {
        setForwardCount((count) => count + 1);
      }
    }
  };

  const isPlayerInTop11 = (player) => {
    return top11PlayersList.some((p) => p._id === player._id);
  };

  const navigateToCreateTop11 = () => {
    navigate("/createTop11");
  };

  return (
    <div>
      <h3>Our 11 chosen</h3>
      <p>
        {goalkeeperCount} goalkeeper(s) selected (max: 1)
      </p>
      <p>
        {defenseCount} defense(s) selected (max: 4)
      </p>
      <p>
        {midfielderCount} midfielder(s) selected (max: 3)
      </p>
      <p>
        {forwardCount} forward(s) selected (max: 3)
      </p>

      {top11PlayersList.map((eachPlayer) => (
        <div className="top11-card" key={eachPlayer._id}>
          <li>
            <h3>{eachPlayer.name}</h3>
            {eachPlayer.imageUrl && (
              <div>
                <img src={eachPlayer.imageUrl} alt="Player" width={200} />
              </div>
            )}
            <p>{eachPlayer.playerPosition}</p>
          </li>
        </div>
      ))}

      <h3>All Players</h3>
      <div className="player-list-in-top11">
        {playersList.map((eachPlayer) => (
          <div className="player-card" key={eachPlayer._id}>
            <h3>{eachPlayer.name}, {eachPlayer.age}</h3>
            <p>{eachPlayer.playerPosition}</p>
            <p>{eachPlayer.skillfulLeg}</p>
            {!isPlayerInTop11(eachPlayer) && (
              <button onClick={() => addToTop11PlayersList(eachPlayer)}>
                Add to Top 11
              </button>
            )}
          </div>
        ))}
      </div>

      <button onClick={navigateToCreateTop11}>Go to Create Top 11</button>
    </div>
  );
}

<<<<<<< HEAD
export default Top11Players
=======
export default Top11Players; 

/* import { useState, useEffect } from "react";
import { playersListService } from "../../services/players.services";
import { getTop11PlayersService } from "../../services/top11Players.services";
import { useNavigate } from "react-router-dom";

function Top11Players() {
  const [playersList, setPlayersList] = useState([]);
  const [top11PlayersList, setTop11PlayersList] = useState([]);
  const [goalkeeperCount, setGoalkeeperCount] = useState(0);
  const [defenseCount, setDefenseCount] = useState(0);
  const [midfielderCount, setMidfielderCount] = useState(0);
  const [forwardCount, setForwardCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getPlayersListData();
    getTop11PlayersData();
  }, []);

  const getPlayersListData = async () => {
    try {
      const response = await playersListService();
      setPlayersList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTop11PlayersData = async () => {
    try {
      const response = await getTop11PlayersService();
      setTop11PlayersList(response.data);
      updatePositionCounts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePositionCounts = (top11Players) => {
    let goalkeeperCount = 0;
    let defenseCount = 0;
    let midfielderCount = 0;
    let forwardCount = 0;

    top11Players.forEach((player) => {
      switch (player.playerPosition) {
        case "goalkeeper":
          goalkeeperCount++;
          break;
        case "defense":
          defenseCount++;
          break;
        case "midfielder":
          midfielderCount++;
          break;
        case "forward":
          forwardCount++;
          break;
        default:
          break;
      }
    });

    setGoalkeeperCount(goalkeeperCount);
    setDefenseCount(defenseCount);
    setMidfielderCount(midfielderCount);
    setForwardCount(forwardCount);
  };

  const addToTop11PlayersList = (player) => {
    if (top11PlayersList.length < 11 && !isPlayerInTop11(player)) {
      if (player.playerPosition === "goalkeeper" && goalkeeperCount >= 1) {
        return;
      }
      if (player.playerPosition === "defense" && defenseCount >= 4) {
        return;
      }
      if (player.playerPosition === "midfielder" && midfielderCount >= 3) {
        return;
      }
      if (player.playerPosition === "forward" && forwardCount >= 3) {
        return;
      }

      setTop11PlayersList((prevList) => [...prevList, player]);
      updatePositionCounts([...top11PlayersList, player]);
    }
  };

  const isPlayerInTop11 = (player) => {
    return top11PlayersList.some((p) => p._id === player._id);
  };

  const navigateToCreateTop11 = () => {
    navigate("/createTop11");
  };

  return (
    <div>
      <h3>Our 11 chosen</h3>
      <p>
        {goalkeeperCount} goalkeeper(s) selected (max: 1)
      </p>
      <p>
        {defenseCount} defense(s) selected (max: 4)
      </p>
      <p>
        {midfielderCount} midfielder(s) selected (max: 3)
      </p>
      <p>
        {forwardCount} forward(s) selected (max: 3)
      </p>

      {top11PlayersList.map((eachPlayer) => (
        <div className="top11-card" key={eachPlayer._id}>
          <li>
            <h3>{eachPlayer.name}</h3>
            {eachPlayer.imageUrl && (
              <div>
                <img src={eachPlayer.imageUrl} alt="Player" width={200} />
              </div>
            )}
            <p>{eachPlayer.playerPosition}</p>
          </li>
        </div>
      ))}

      <h3>All Players</h3>
      <div className="player-list-in-top11">
        {playersList.map((eachPlayer) => (
          <div className="player-card" key={eachPlayer._id}>
            <h3>{eachPlayer.name}, {eachPlayer.age}</h3>
            <p>{eachPlayer.playerPosition}</p>
            <p>{eachPlayer.skillfulLeg}</p>
            {!isPlayerInTop11(eachPlayer) && (
              <button onClick={() => addToTop11PlayersList(eachPlayer)}>
                Add to Top 11
              </button>
            )}
          </div>
        ))}
      </div>

      <button onClick={navigateToCreateTop11}>Go to Create Top 11</button>
    </div>
  );
}

export default Top11Players;
 */




>>>>>>> dev
