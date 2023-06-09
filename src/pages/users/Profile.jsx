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
       <img className={styles.profileImage} 
         src={profile.profileImg || "/images/tortilla_futbol.png"}
         alt="profileImg"
         width={300}
       />
       <h4 className={styles.username}>Username: {profile.username} ⭐</h4>
       <p className={styles.username}>E-mail: {profile.email}</p>

      </div>
             <button className={styles.editProfileBtn} onClick={handleEditProfile}>Edit Profile</button>
         <h5 className={styles.h5Profile}>Jugadores Favoritos</h5>
         
        <div  className={styles.profileCardData} >

         <div className={styles.playerCard}>
         {likedPlayers.map((player) => (
           <div key={player._id}>
             <h5 className={styles.playerName}>{player.name}</h5>
             <br />
             <p className={styles.playerAge} >Age: {player.age}</p>
             <br />
             <img className={styles.playerImg}
               src={player.imageUrl}
               alt="playerImg"
               /* width={350}
               height={200} */
             />
             <br />
             <p className={styles.playerTeam} >Team: {player.currentTeam}</p>
             <br />
             <p className={styles.playerLeg} >Leg: {player.skillfulLeg}</p>


        </div>
         ))}
         </div>
         </div>
       
     </div>
   );
 }
 
 export default Profile;