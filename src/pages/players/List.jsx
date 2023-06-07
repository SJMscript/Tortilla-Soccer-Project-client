import React, { useState, useEffect } from "react";
import {
  playersListService,
  playersLikesService,
  playersDislikesService,
} from "../../services/players.services";
import { Link } from "react-router-dom";

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
    <div>
      <h3>Lista de jugadores</h3>

      <div className="player-list">
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

/* import React, { useState, useEffect } from "react";
import {
  playersListService,
  playersLikesService,
  playersDislikesService,
} from "../../services/players.services";
import { Link } from "react-router-dom";

function List() {
  const [playersList, setPlayersList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedPlayers, setLikedPlayers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getPlayersData();
  }, []);

  const getPlayersData = async () => {
    try {
      let response;

      if (filter === "goalkeeper") {
        response = await playersListService({ position: "goalkeeper" });
      } else if (filter === "defense") {
        response = await playersListService({ position: "defense" });
      } else if (filter === "midfielder") {
        response = await playersListService({ position: "midfielder" });
      } else if (filter === "forward") {
        response = await playersListService({ position: "forward" });
      } else {
        response = await playersListService();
      }

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
      await getPlayersData();

      setLikedPlayers([...likedPlayers, playerId]);
      console.log("Player added to likedPlayers:", playerId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromLikedPlayers = async (playerId) => {
    try {
      await playersDislikesService(playerId);
      await getPlayersData();

      setLikedPlayers(likedPlayers.filter((id) => id !== playerId));
      console.log("Player removed from likedPlayers:", playerId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Lista de jugadores</h3>

      <select value={filter} onChange={handleFilterChange}>
        <option value="all">Todos</option>
        <option value="goalkeeper">Porteros</option>
        <option value="defense">Defensas</option>
        <option value="midfielder">Centrocampistas</option>
        <option value="forward">Delanteros</option>
      </select>

      <div className="player-list">
        {playersList.map((eachPlayer) => (
          <div className="each-player-in-list" key={eachPlayer._id}>
            <li>
              <Link to={`/players/${eachPlayer._id}/details`}>
                <h3>{eachPlayer.name}, {eachPlayer.age}</h3>
              </Link>
              <p>Position: {eachPlayer.playerPosition}</p>
              <p>Skillful Leg: {eachPlayer.skillfulLeg}</p>
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
 */

