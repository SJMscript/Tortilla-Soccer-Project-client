import { useState, useEffect } from "react";
import { playersListService } from "../../services/players.services";
import { useNavigate } from "react-router-dom";
import { createTop11Service, getTop11Service } from "../../services/top11Players.services";
import { profileService } from "../../services/profile.services";

function Top11Players() {
  const [playersList, setPlayersList] = useState([]);
  const [top11PlayersList, setTop11PlayersList] = useState([]);
  const [goalkeeperCount, setGoalkeeperCount] = useState(0);
  const [defenseCount, setDefenseCount] = useState(0);
  const [midfielderCount, setMidfielderCount] = useState(0);
  const [forwardCount, setForwardCount] = useState(0);
  const [ noTop11, setNoTop11 ] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getPlayersListData();
  }, []);

  const getPlayersListData = async () => {
    try {
      const response = await playersListService();
      console.log(response, "response");
      setPlayersList(response.data);
      const top11response = await getTop11Service()
      console.log(top11response)
      setTop11PlayersList(top11response.data)
      const userInfo = await profileService();
      console.log(userInfo, "userinfo")
      const remainingPlayers = response.data.filter(player => {
        return !userInfo.data.top11.includes(player._id)
      })
      setNoTop11(remainingPlayers)
    } catch (error) {
      console.error(error);
    }
  };

  //* Jorge AUXILIO , REFRESH, CONTADOR, PERFIL. 

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
        // Llamada al servicio para guardar el Top11 elegido
        const response = await createTop11Service({
          player: player._id,
          position: player.playerPosition,
        });
        console.log(response, "respuesta del servicio");
  
        // Agregar el Top11 a la lista
        setTop11PlayersList((prevList) => [...prevList, response.data]);
        console.log(top11PlayersList, "que estamos almacenando?")
  
        if (player.playerPosition === "goalkeeper") {
          setGoalkeeperCount((count) => count + 1);
        } else if (player.playerPosition === "defense") {
          setDefenseCount((count) => count + 1);
        } else if (player.playerPosition === "midfielder") {
          setMidfielderCount((count) => count + 1);
        } else if (player.playerPosition === "forward") {
          setForwardCount((count) => count + 1);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  

  const isPlayerInTop11 = (player) => {
    return top11PlayersList.some((p) => p.player._id === player._id);
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
            <h3>{eachPlayer.player.name}</h3>
            {eachPlayer.player.imageUrl && (
              <div>
                <img src={eachPlayer.player.imageUrl} alt="Player" width={200} />
              </div>
            )}
            <p>{eachPlayer.player.playerPosition}</p>
          </li>
        </div>
      ))}

      <h3>All Players</h3>
      <div className="player-list-in-top11">
        {noTop11.map((eachPlayer) => (
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

export default Top11Players