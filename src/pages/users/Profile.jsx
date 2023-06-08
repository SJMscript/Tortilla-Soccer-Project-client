 import { profileService } from "../../services/profile.services";
 import { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";
 import styles from "../../css/profile.module.css"
 import { GridLoader } from "react-spinners";
 
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
       setLikedPlayers(userProfile.data.likedPlayers);
       setIsLoading(false);
     } catch (error) {
       console.log(error);
       navigate("/error");
     }
   };
 
   const handleEditProfile = () => {
     navigate("/user/profile/edit");
   };
 
   if (isLoading) {
     return (

     <div>
      <GridLoader color="rgba(255, 245, 0, 1)" />
     </div>
     )
   }
 
   return (
     <div className={styles.profile}>
      <div className={styles.profileData}>
       <img
         src={profile.profileImg || "/images/perfil2.png"}
         alt="profileImg"
         width={300}
       />
       <h4 className={styles.username}>Username: {profile.username} ⭐</h4>
       <p className={styles.username}>E-mail: {profile.email}</p>

      </div>
        <div  className={styles.profileCardData} >

         <h5 className={styles.h5Profile}>Jugadores Favoritos</h5>
         <div>
         {likedPlayers.map((player) => (
           <div key={player._id}>
             <h5>{player.name}</h5>
             <p>Age: {player.age}</p>
             <img
               src={player.imageUrl}
               alt="playerImg"
               width={250}
               height={200}
             />
             <p>Team: {player.currentTeam}</p>
             <p>Leg: {player.skillfulLeg}</p>

        </div>
         ))}
         </div>
         </div>
       
       <button onClick={handleEditProfile}>Edit Profile</button>
     </div>
   );
 }
 
 export default Profile;