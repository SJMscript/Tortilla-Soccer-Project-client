import { useState, useEffect, useContext } from "react";
import { playerDetailsService } from "../../services/players.services";
import { addCommentService, deleteCommentService } from "../../services/players.services";
import { useParams, useNavigate } from "react-router-dom";
import { getPlayerCommentsService } from "../../services/players.services";
import { AuthContext } from "../../context/auth.context";

function Details() {
  const [playerDetails, setPlayerDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isModerator, setIsModerator] = useState(false);
  const { playerId } = useParams();
  const navigate = useNavigate();
  
  const { activeUser } = useContext(AuthContext); // Obtener el activeUser desde el contexto de autenticación
  const userId = activeUser ? activeUser._id : null; // Obtener el userId del activeUser

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
      console.log(comment, "comment");
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
                <p>Username: {comment.creator.username}</p>
                <p>Comment: {comment.content}</p>
                {/* {console.log(userId)}
                {console.log("userId type:", typeof userId)}
                {console.log("comment creator ID type:", typeof comment.creator._id)}
                {console.log("userId:", userId)}
                {console.log("comment creator ID:", comment.creator._id)} */}
                {comment.creator._id === userId && (
                  <button onClick={() => deleteComment(comment._id)}>Delete</button>
                )}
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
