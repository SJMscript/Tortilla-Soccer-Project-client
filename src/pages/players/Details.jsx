import { useState, useEffect, useContext } from "react";
import { playerDetailsService } from "../../services/players.services";
import { addCommentService, deleteCommentService } from "../../services/players.services";
import { useParams, useNavigate } from "react-router-dom";
import { getPlayerCommentsService } from "../../services/players.services";
import { AuthContext } from "../../context/auth.context";
import { getUserRoleService } from "../../services/profile.services"; // Agregado: Importar getUserRoleService

function Details() {
  const [playerDetails, setPlayerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isModerator, setIsModerator] = useState(false);
  const [userRole, setUserRole] = useState(""); // Agregado: Estado para almacenar el rol del usuario
  const { playerId } = useParams();
  const navigate = useNavigate();
  
  const { activeUser } = useContext(AuthContext);
  const userId = activeUser ? activeUser._id : null;

  useEffect(() => {
    getPlayerDetailData();
    getUserRole(); // Agregado: Llamar a la función getUserRole
  }, []);

  const getPlayerDetailData = async () => {
    try {
      const OnePlayerDetails = await playerDetailsService(playerId);
      setPlayerDetails(OnePlayerDetails.data);
      setIsLoading(false);
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
      await addCommentService(playerId, { content: comment });
      getPlayerDetailData();
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await deleteCommentService(commentId);
      getPlayerDetailData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPlayer = () => {
    navigate(`/players/${playerId}/edit`);
  };

  const handleDeletePlayer = () => {
    navigate(`/players/${playerId}/delete`);
  };

  const getUserRole = async () => {
    try {
      const userRoleResponse = await getUserRoleService();
      setUserRole(userRoleResponse.data.role);
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
          <h4>{playerDetails.name}, {playerDetails.age}</h4>
          <p>Current Team: {playerDetails.currentTeam}</p>
          <p>Skillful Leg: {playerDetails.skillfulLeg}</p>
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
                <p>Username: {comment.creator.username}</p>
                <p>Comment: {comment.content}</p>
                {comment.creator._id === userId || userRole === "moderator" ? ( // Actualizado: Permitir que el moderador elimine todos los comentarios
                  <button onClick={() => deleteComment(comment._id)}>Delete</button>
                ) : null}
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {userRole === "moderator" && ( // Actualizado: Mostrar los botones de edición y eliminación solo para los moderadores
        <div>
          <button onClick={handleEditPlayer}>Edit Player</button>
          <button onClick={handleDeletePlayer}>Delete Player</button>
        </div>
      )}
    </div>
  );
}

export default Details;


