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
      setLikedPlayers(userProfile.data.likedPlayers); // Agregamos los jugadores favoritos al estado
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
      <img src={profile.profileImg} alt="profileImg" width={300} />
      <h4>Username: {profile.username}</h4>
      <p>E-mail: {profile.email}</p>

      <div>
        <h5>Jugadores Favoritos</h5>
        {likedPlayers.map((player) => (
          <div key={player._id}>
            <h5>{player.name}</h5>
            <p>Age: {player.age}</p>
            <img src={player.imageUrl} alt="playerImg" width={250} height={200} />
            <p>Team: {player.currentTeam}</p>
            <p>Leg: {player.skillfulLeg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
