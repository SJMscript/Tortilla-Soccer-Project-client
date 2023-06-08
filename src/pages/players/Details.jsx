import { useState, useEffect } from "react";
import { playerDetailsService } from "../../services/players.services";
import { addCommentService } from "../../services/players.services";
import { useParams, useNavigate } from "react-router-dom";
import { getPlayerCommentsService } from "../../services/players.services";
import { getUserRoleService } from "../../services/profile.services";

function Details() {
  const [playerDetails, setPlayerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isModerator, setIsModerator] = useState(false);
  const { playerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPlayerDetailData();
    getUserRole();
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

  const getUserRole = async () => {
    try {
      const userRole = await getUserRoleService();
      setIsModerator(userRole.data.role === "moderator");
    } catch (error) {
      console.log(error);
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

  const handleEditPlayer = () => {
    // Redireccionar al usuario a la página de edición del jugador
    navigate(`/players/${playerId}/edit`);
  };

  const handleDeletePlayer = () => {
    // Redireccionar al usuario a la página de borrado del jugador
    navigate(`/players/${playerId}/delete`);
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

      <div className="all-comments-div">
        <h3>Comments:</h3>
        <hr />
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <p>Username: {comment.creator}</p>
                <p>Comment: {comment.content}</p>
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {isModerator && (
        <div>
          <button onClick={handleEditPlayer}>Edit Player</button>
          <button onClick={handleDeletePlayer}>Delete Player</button>
        </div>
      )}
    </div>
  );
}

export default Details;