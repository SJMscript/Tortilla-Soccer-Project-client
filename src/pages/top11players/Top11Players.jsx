import { useState, useEffect } from "react";
import { playersListService } from "../../services/players.services";
import { useNavigate } from "react-router-dom";
import { createTop11Service, getTop11Service, deleteTop11Service } from "../../services/top11Players.services";
import { profileService } from "../../services/profile.services";
import styles from "../../css/top11.module.css"

function Top11Players() {
  const [playersList, setPlayersList] = useState([]);
  const [top11PlayersList, setTop11PlayersList] = useState([]);
  const [goalkeeperCount, setGoalkeeperCount] = useState(0);
  const [defenseCount, setDefenseCount] = useState(0);
  const [midfielderCount, setMidfielderCount] = useState(0);
  const [forwardCount, setForwardCount] = useState(0);
  const [noTop11, setNoTop11] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPlayersListData();
  }, []);

  const getPlayersListData = async () => {
    try {
      const response = await playersListService();
      console.log(response, "response");
      setPlayersList(response.data);
      const top11response = await getTop11Service();
      console.log(top11response);
      setTop11PlayersList(top11response.data);
      const userInfo = await profileService();
      console.log(userInfo, "userinfo");
      const remainingPlayers = response.data.filter((player) => {
        return !userInfo.data.top11.includes(player._id);
      });
      setNoTop11(remainingPlayers);
    } catch (error) {
      console.error(error);
    }
  };

  const addToTop11PlayersList = async (player) => {
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

      try {
        const response = await createTop11Service({
          player: player._id,
          position: player.playerPosition,
        });
        console.log(response, "respuesta del servicio");

        setTop11PlayersList((prevList) => [...prevList, response.data]);

        if (player.playerPosition === "goalkeeper") {
          setGoalkeeperCount((count) => count + 1);
        } else if (player.playerPosition === "defense") {
          setDefenseCount((count) => count + 1);
        } else if (player.playerPosition === "midfielder") {
          setMidfielderCount((count) => count + 1);
        } else if (player.playerPosition === "forward") {
          setForwardCount((count) => count + 1);
        }

        const top11response = await getTop11Service();
        setTop11PlayersList(top11response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeFromTop11PlayersList = async (playerId) => {
    try {
      const response = await deleteTop11Service(playerId);
      console.log(response, "respuesta del servicio");
      setTop11PlayersList((prevList) => prevList.filter((player) => player._id !== playerId));

      const player = playersList.find((p) => p._id === playerId);
      if (player) {
        if (player.playerPosition === "goalkeeper") {
          setGoalkeeperCount((count) => count - 1);
        } else if (player.playerPosition === "defense") {
          setDefenseCount((count) => count - 1);
        } else if (player.playerPosition === "midfielder") {
          setMidfielderCount((count) => count - 1);
        } else if (player.playerPosition === "forward") {
          setForwardCount((count) => count - 1);
        }
      }

      window.location.reload(); // Recargar la página para mostrar la lista actualizada del Top 11
    } catch (error) {
      console.error(error);
    }
  };

  const isPlayerInTop11 = (player) => {
    return top11PlayersList.some((p) => p.player._id === player._id);
  };

  const navigateToCreateTop11 = () => {
    navigate("/createTop11");
  };

  const renderPlayerListByPosition = (position) => {
    return (
      <div className={styles.playersList}>
        <h3>{position}s</h3>
        <div className="player-list-in-top11">
          {noTop11.map((eachPlayer) => {
            if (eachPlayer.playerPosition === position) {
              return (
                <div className="player-card" key={eachPlayer._id}>
                  <h3>
                    {eachPlayer.name}, {eachPlayer.age}
                  </h3>
                  <p>{eachPlayer.playerPosition}</p>
                  <p>{eachPlayer.skillfulLeg}</p>
                  {!isPlayerInTop11(eachPlayer) && (
                    <button onClick={() => addToTop11PlayersList(eachPlayer)}>
                      Add to Top 11
                    </button>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.playersList}>
      <h1>Our 11 chosen</h1>
      <br />
      <p>Formation 1-4-3-3</p>
      <br />
      <div>
        <h3>Goalkeepers</h3>
        <div className={styles.top11CardContainer}>
          {top11PlayersList.map((eachPlayer) => {
            if (eachPlayer.player.playerPosition === 'goalkeeper') {
              return (
                <div className="top11-card" key={eachPlayer._id}>
                  <li>
                    <h3>{eachPlayer.player.name}</h3>
                    {eachPlayer.player.imageUrl && (
                      <div>
                        <img src={eachPlayer.player.imageUrl} alt="Player" width={200} />
                      </div>
                    )}
                    <p>{eachPlayer.player.playerPosition}</p>
                    <button onClick={() => removeFromTop11PlayersList(eachPlayer.player._id)}>
                      Remove from Top 11
                    </button>
                  </li>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div>
        <h3>Defenses</h3>
        <div className={styles.top11CardContainer}>
          {top11PlayersList.map((eachPlayer) => {
            if (eachPlayer.player.playerPosition === 'defense') {
              return (
                <div className="top11-card" key={eachPlayer._id}>
                  <li>
                    <h3>{eachPlayer.player.name}</h3>
                    {eachPlayer.player.imageUrl && (
                      <div>
                        <img src={eachPlayer.player.imageUrl} alt="Player" width={200} />
                      </div>
                    )}
                    <p>{eachPlayer.player.playerPosition}</p>
                    <button onClick={() => removeFromTop11PlayersList(eachPlayer.player._id)}>
                      Remove from Top 11
                    </button>
                  </li>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div>
        <h3>Midfielders</h3>
        <div className={styles.top11CardContainer}>
          {top11PlayersList.map((eachPlayer) => {
            if (eachPlayer.player.playerPosition === 'midfielder') {
              return (
                <div className="top11-card" key={eachPlayer._id}>
                  <li>
                    <h3>{eachPlayer.player.name}</h3>
                    {eachPlayer.player.imageUrl && (
                      <div>
                        <img src={eachPlayer.player.imageUrl} alt="Player" width={200} />
                      </div>
                    )}
                    <p>{eachPlayer.player.playerPosition}</p>
                    <button onClick={() => removeFromTop11PlayersList(eachPlayer.player._id)}>
                      Remove from Top 11
                    </button>
                  </li>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      <div>
        <h3>Forwards</h3>
        <div className={styles.top11CardContainer}>
          {top11PlayersList.map((eachPlayer) => {
            if (eachPlayer.player.playerPosition === 'forward') {
              return (
                <div className="top11-card" key={eachPlayer._id}>
                  <li>
                    <h3>{eachPlayer.player.name}</h3>
                    {eachPlayer.player.imageUrl && (
                      <div>
                        <img src={eachPlayer.player.imageUrl} alt="Player" width={200} />
                      </div>
                    )}
                    <p>{eachPlayer.player.playerPosition}</p>
                    <button onClick={() => removeFromTop11PlayersList(eachPlayer.player._id)}>
                      Remove from Top 11
                    </button>
                  </li>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {renderPlayerListByPosition("goalkeeper")}
      {renderPlayerListByPosition("defense")}
      {renderPlayerListByPosition("midfielder")}
      {renderPlayerListByPosition("forward")}

      
    </div>
  );
}

export default Top11Players;