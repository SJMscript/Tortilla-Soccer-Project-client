
import React, { useState, useEffect } from "react";
import { playersListService, playersLikesService, playersDislikesService } from "../../services/players.services";
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
      // Lógica para agregar el jugador al array de likedPlayers en el modelo de usuario
      // Aquí debes implementar tu propia lógica para comunicarte con tu backend
      // Puedes usar una función o servicio para enviar una solicitud POST al endpoint correspondiente

      // Por ejemplo, supongamos que tienes una función llamada addToLikedPlayersService
      // que realiza una solicitud POST al endpoint '/:playerId/like' en tu backend

      await playersLikesService(playerId);

      // Actualizar el estado o realizar cualquier otra acción necesaria
      // en caso de que la solicitud haya sido exitosa
      setLikedPlayers([...likedPlayers, playerId]);
      console.log("Player added to likedPlayers:", playerId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromLikedPlayers = async (playerId) => {
    try {
      // Lógica para eliminar el jugador del array de likedPlayers en el modelo de usuario
      // Aquí debes implementar tu propia lógica para comunicarte con tu backend
      // Puedes usar una función o servicio para enviar una solicitud POST al endpoint correspondiente

      // Por ejemplo, supongamos que tienes una función llamada removeFromLikedPlayersService
      // que realiza una solicitud POST al endpoint '/:playerId/dislike' en tu backend

      await playersDislikesService(playerId);

      // Actualizar el estado o realizar cualquier otra acción necesaria
      // en caso de que la solicitud haya sido exitosa
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

      {playersList.map((eachPlayer) => (
        <div key={eachPlayer._id}>
          <li>
            <Link to="" ><h3>
              {eachPlayer.name}
            </h3>
            </Link>
            <p>Position: {eachPlayer.playerPosition}</p>
            <p>{eachPlayer.imageUrl}</p>
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
  );
}

export default List;

