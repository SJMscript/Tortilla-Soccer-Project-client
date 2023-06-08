import React, { useState, useEffect } from "react";
import {
  playersListService,
  playersLikesService,
  playersDislikesService,
} from "../../services/players.services";
import { Link } from "react-router-dom";
import styles from "../../css/playersList.module.css"


function List() {
  const [playersList, setPlayersList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedPlayers, setLikedPlayers] = useState([]);

  useEffect(() => {
    getPlayersData();
  }, []);

  const getPlayersData = async () => {
    try {
      const response = await playersListService();
      console.log(response, "response");
      setPlayersList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToLikedPlayers = async (playerId) => {
    try {
      await playersLikesService(playerId);

      setLikedPlayers([...likedPlayers, playerId]);
      console.log("Player added to likedPlayers:", playerId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromLikedPlayers = async (playerId) => {
    try {
      await playersDislikesService(playerId);

      setLikedPlayers(likedPlayers.filter((id) => id !== playerId));
      console.log("Player removed from likedPlayers:", playerId);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className={styles.main}>
      <h3>Lista de jugadores</h3>

      <div className={styles.playerList}>
        {playersList.map((eachPlayer) => (
          <div className="each-player-in-list" key={eachPlayer._id}>
            <li>
              <Link to={`/players/${eachPlayer._id}/details`}>
                <h3>{eachPlayer.name}</h3>
              </Link>
              <p>Position: {eachPlayer.playerPosition}</p>
              {eachPlayer.imageUrl && (
                <div>
                  <img src={eachPlayer.imageUrl} alt="Player" width={200} />
                </div>
              )}
              {likedPlayers.includes(eachPlayer._id) ? (
                <button
                  onClick={() => handleRemoveFromLikedPlayers(eachPlayer._id)}
                  style={{ fontSize: "24px", cursor: "pointer" }}
                >
                  💔
                </button>
              ) : (
                <button
                  onClick={() => handleAddToLikedPlayers(eachPlayer._id)}
                  style={{ fontSize: "24px", cursor: "pointer" }}
                >
                  ❤️
                </button>
              )}
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
