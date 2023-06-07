import { useState, useEffect } from "react";
import { playerDetailsService } from "../../services/players.services";
import { addCommentService } from "../../services/players.services";
import { useParams } from "react-router-dom";
import { getPlayerCommentsService } from "../../services/players.services";

function Details() {
  const [playerDetails, setPlayerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { playerId } = useParams();

  useEffect(() => {
    getPlayerDetailData();
  }, []);

  const getPlayerDetailData = async () => {
    try {
      const OnePlayerDetails = await playerDetailsService(playerId);
      console.log("response OnePlayerDetails", OnePlayerDetails);
      setPlayerDetails(OnePlayerDetails.data);
      setIsLoading(false);
      console.log("playerDetails", OnePlayerDetails.data);
      const playerComments = await getPlayerCommentsService(playerId);
      setComments(playerComments.data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = async (event) => {
    event.preventDefault();

    try {
      await addCommentService(playerId, { comment });
      // Actualizar los detalles del jugador para mostrar el nuevo comentario
      getPlayerDetailData();
      setComment(""); // Limpiar el campo del formulario después de enviar el comentario
    } catch (error) {
      console.log(error);
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

          {playerDetails.imageUrl && (
            <div>
              <img src={playerDetails.imageUrl} alt="Player" width={200} />
            </div>
          )}
        </div>
      ) : (
        <h3>No player details found</h3>
      )}

      <form onSubmit={submitComment}>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Escribe tu comentario aquí"
        ></textarea>
        <button type="submit">Comment</button>
      </form>

      <h3>Comments:</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>Username: {comment.creator.username}</p>
              <p>Comment: {comment.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

export default Details;
