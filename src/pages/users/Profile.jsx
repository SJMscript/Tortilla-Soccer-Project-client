// import { profileService } from "../../services/profile.services";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { playersLikesService } from "../../services/players.services";

// function Profile() {
//   const [profile, setProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isLiked, setIsLiked] = useState(null);
//   const navigate = useNavigate();
// ;

//   useEffect(() => {
//     getProfilesData();
//   }, []);

//   const getProfilesData = async () => {
//     try {
//       const userProfile = await profileService();
//       // const isLike = await playersLikesService()
//       setProfile(userProfile.data);
//       // setIsLiked(isLike.data)
//       setIsLoading(false);
//     } catch (error) {
//       console.log(error);
//       navigate("/error");
//     }
//   };

//   if (isLoading) {
//     return <h3>Loading...</h3>;
//   }

//   return (
//     <div>
//       <h4>Username: {profile.username}</h4>
//       <p>E-mail: {profile.email}</p>

//       {/* <div>
//        <h5> Jugadores Favoritos </h5>
//         {isLiked && isLiked.map((eachLike) => {
//           return (
//           <div key={eachLike._id}>
//           <h5>{eachLike.name}</h5>
//           <p>Age: {eachLike.age}</p>
//           <p>Team: {eachLike.currentTeam}</p>
//           <p>Leg: {eachLike.skillfulLeg}</p>
//       </div>
//         );
//        })}
//      </div> */}
//     </div>
//   );
// }
// export default Profile;

import { profileService } from "../../services/profile.services";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { playersLikesService } from "../../services/players.services";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedPlayers, setLikedPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProfilesData();
  }, []);

  const getProfilesData = async () => {
    try {
      const userProfile = await profileService();
      setProfile(userProfile.data);
      // Obtener la lista de jugadores que le gustan al usuario
      // const likedPlayersResponse = await playersLikesService();
      // setLikedPlayers(likedPlayersResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h4>Username: {profile.username}</h4>
      <p>E-mail: {profile.email}</p>

      <div>
        <h5>Jugadores Favoritos</h5>
        {likedPlayers.map((player) => (
          <div key={player.id}>
            <h5>{player.name}</h5>
            <p>Age: {player.age}</p>
            <p>Team: {player.team}</p>
            <p>Leg: {player.skillfulLeg}</p>
            <p>Leg: {player.likedPlayers}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
