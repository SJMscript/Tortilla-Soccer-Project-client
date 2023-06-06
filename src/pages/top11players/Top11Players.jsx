
 import { useState, useEffect } from "react";
 import { createTop11Service } from "../../services/top11Players.services";
 import { playersListService } from "../../services/players.services";
 import { useNavigate, useParams } from "react-router-dom";

 function Top11Players() {
   const [playersList, setPlayersList] = useState([]);
   const [top11PlayersList, setTop11PlayersList] = useState([]);

   useEffect(() => {
     getPlayersListData();
   }, []);

   const getPlayersListData = async () => {
     try {
       const response = await playersListService();
       console.log(response, "response");
       setPlayersList(response.data);
     } catch (error) {
       console.error(error);
     }
   };

   const addToTop11PlayersList = (player) => {
     setTop11PlayersList((prevList) => [...prevList, player]);
   };

   return (
     <div>
       <h3>Our 11 chosen</h3>

      {top11PlayersList.map((eachPlayer) => (
        <div className="top11-card" key={eachPlayer._id}>
          <li>
            <p>{eachPlayer.name}</p>
            <p>{eachPlayer.imageUrl}</p>
            <p>{eachPlayer.position}</p>
          </li>
        </div>
      ))}

       <h3>All Players</h3>

      {playersList.map((eachPlayer) => (
        <div className="player-card" key={eachPlayer._id}>
          <h5>{eachPlayer.name}</h5>
          <button onClick={() => addToTop11PlayersList(eachPlayer)}>Add to Top 11</button>
        </div>
      ))}
    </div>
  );
}

<<<<<<< HEAD
export default Top11Players
=======
export default Top11Players
>>>>>>> dev
