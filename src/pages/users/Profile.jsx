/*  import { profileService } from "../../services/profile.services";
 import { useEffect, useState } from "react";
 import { useNavigate, useParams } from "react-router-dom";
 import { uploadImageService } from "../../services/upload.services";
 function Profile() {
   const [profile, setProfile] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [likedPlayers, setLikedPlayers] = useState([]);
   const [imageUrl, setImageUrl] = useState(null);
   const [isUploading, setIsUploading] = useState(false);
   const navigate = useNavigate();
   useEffect(() => {
     getProfilesData();
   }, []);
   const getProfilesData = async () => {
     try {
       const userProfile = await profileService();
       setProfile(userProfile.data);
       console.log(userProfile.data);
       setLikedPlayers(userProfile.data.likedPlayers);
       setIsLoading(false);
     } catch (error) {
       console.log(error);
       navigate("/error");
     }
   };
   const handleFileUpload = async (event) => {
     if (!event.target.files[0]) {
       return;
     }
     setIsUploading(true);
     const uploadData = new FormData();
     uploadData.append("image", event.target.files[0]);
     try {
       const response = await uploadImageService(uploadData);
       setImageUrl(response.data.imageUrl);
       setIsUploading(false);
     } catch (error) {
       navigate("/error");
     }
   };
   if (isLoading) {
     return <h3>Loading...</h3>;
   }
   return (
     <div>
       {profile.profileImg && (
         <img src={profile.profileImg} alt="profileImg" width={300} />
       )}
       <div>
         <label>Image:</label>
         <input
           type="file"
           name="image"
           onChange={handleFileUpload}
           disabled={isUploading}
         />
       </div>
       {isUploading ? <h3>... uploading image</h3> : null}
       {imageUrl ? (
         <div>
           <img src={imageUrl} alt="img" width={200} />
         </div>
       ) : null}
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
 */
 import { profileService } from "../../services/profile.services";
 import { useEffect, useState } from "react";
 import { useNavigate } from "react-router-dom";
 
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
     return <h3>Loading...</h3>;
   }
 
   return (
     <div>
       <img
         src={profile.profileImg || "/images/default.jpg"}
         alt="profileImg"
         width={300}
       />
       <h4>Username: {profile.username}</h4>
       <p>E-mail: {profile.email}</p>
       <div>
         <h5>Jugadores Favoritos</h5>
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
       <button onClick={handleEditProfile}>Edit Profile</button>
     </div>
   );
 }
 
 export default Profile;