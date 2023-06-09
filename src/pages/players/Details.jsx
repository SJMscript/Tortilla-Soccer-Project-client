import { useState, useEffect, useContext } from "react";
import { playerDetailsService } from "../../services/players.services";
import { addCommentService, deleteCommentService } from "../../services/players.services";
import { useParams, useNavigate } from "react-router-dom";
import { getPlayerCommentsService } from "../../services/players.services";
import { AuthContext } from "../../context/auth.context";
import { getUserRoleService } from "../../services/profile.services"; 
import styles from "../../css/details.module.css"

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
    <div className={styles.bodyDetails}>
      <h1 className={styles.h1Details} >Player Details</h1>

      {playerDetails ? (
        <div>
          <h4 className={styles.h4Details} >{playerDetails.name}, {playerDetails.age}</h4>
          <p className={styles.pDetails} >Current Team: {playerDetails.currentTeam}</p>
          <p className={styles.pDetails} >Skillful Leg: {playerDetails.skillfulLeg}</p>
          {playerDetails.imageUrl && (
            <div>
              <img className={styles.imgDetails} src={playerDetails.imageUrl} alt="Player" width={200} />
            </div>
          )}
        </div>
      ) : (
        <h3>No player details found</h3>
      )}

      <form onSubmit={submitComment}>
        <textarea className={styles.textareaDetails}
          value={comment}
          onChange={handleCommentChange}
          placeholder="Escribe tu comentario aquí"
        ></textarea>
        <button className={styles.btnDetails} type="submit">Comment</button>
      </form>

      <div className="all-comments-div">
        <h3>Comments:</h3>
        <hr className={styles.hrDetails} />
        {comments.length > 0 ? (
          <ul className={styles.ulLiDetails} >
            {comments.map((comment) => (
              <li className={styles.ulLiDetails} key={comment._id}>
                <p className={styles.pDetails} >Username: {comment.creator.username}</p>
                <p className={styles.pDetails} >Comment: {comment.content}</p>
                {comment.creator._id === userId || userRole === "moderator" ? ( // Actualizado: Permitir que el moderador elimine todos los comentarios
                  <button className={styles.btnDetails} onClick={() => deleteComment(comment._id)}>Delete</button>
                ) : null}
                <hr className={styles.hrDetails} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.pDetails} >No comments yet.</p>
        )}
      </div>

      {userRole === "moderator" && ( // Actualizado: Mostrar los botones de edición y eliminación solo para los moderadores
        <div>
          <button className={styles.btnDetails} onClick={handleEditPlayer}>Edit Player</button>
          <button className={styles.btnDetails} onClick={handleDeletePlayer}>Delete Player</button>
        </div>
      )}
    </div>
  );
}

export default Details;


