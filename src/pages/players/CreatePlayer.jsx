import { useState } from "react"
import { createPlayerService } from "../../services/players.services"
import { RingLoader } from "react-spinners"

import { useNavigate } from "react-router-dom";

function CreatePlayer() {

    const navigate = useNavigate();

    const [ playerName, setPlayerName] = useState("")
    const [ playerAge, setPlayerAge] = useState(0)
    const [ playerPosition, setPlayerPosition] = useState("")
    const [ playerSkillfulLeg, setPlayerSkillfulLeg] = useState("")
    const [ playerImageUrl, setPlayerImageUrl] = useState("")
    const [ playerMarketValue, setPlayerMarketValue] = useState(0)
    const [ playerCurrentTeam, setPlayerCurrentTeam] = useState("")

    //const [ isLoading, setIsLoading ] = useState(true)

    const handleNameChange =  (e) => setPlayerName(e.target.value)
    const handleAgeChange =  (e) => setPlayerAge(e.target.value)
    const handlePositionChange =  (e) => setPlayerPosition(e.target.value)
    const handleSkillfulLegChange =  (e) => setPlayerSkillfulLeg(e.target.value)
    const handleImageUrlChange =  (e) => setPlayerImageUrl(e.target.value)
    const handleCurrentTeamChange =  (e) => setPlayerCurrentTeam(e.target.value)
    const handleMarketValueChange =  (e) => setPlayerMarketValue(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault()
    
    
        try {
          
          const createPlayer = await createPlayerService({
            name: playerName,
            age: playerAge,
            playerPosition: playerPosition,
            skillfulLeg: playerSkillfulLeg,
            imageUrl: playerImageUrl,
            marketValue: playerMarketValue,
            currentTeam: playerCurrentTeam
          })
          console.log("response", createPlayer)
          // redirect to players list page
          navigate("/players/list")
    
        } catch (error) {
          console.log(error)
          navigate("/error")
        }
      }
    
      return (
        <div className="AddPlayerPage">
          <h3>Add a new Player</h3>
    
          <form onSubmit={handleSubmit}   encType="multipart/form-data">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleNameChange}
              value={playerName}
            />
            <br />
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              onChange={handleAgeChange}
              value={playerAge}
            />
            <br />
            <label htmlFor="position">Position</label>
            <input
              type="text"
              name="position"
              onChange={handlePositionChange}
              value={playerPosition}
            />
            <br />
            <label htmlFor="skillfulLeg">Skillful Leg</label>
            <input
              type="text"
              name="skillfulLeg"
              onChange={handleSkillfulLegChange}
              value={playerSkillfulLeg}
            />
            <br />
            <label htmlFor="imageUrl">Image</label>
            <input
              type="file"
              name="imageUrl"
              onChange={handleImageUrlChange}
              value={playerImageUrl}
            />
            <br />
            <label htmlFor="currentTeam">Current Team</label>
            <input
              type="text"
              name="currentTeam"
              onChange={handleCurrentTeamChange}
              value={playerCurrentTeam}
            />
            <br />
            <label htmlFor="marketValue">Market Value</label>
            <input
              type="text"
              name="marketValue"
              onChange={handleMarketValueChange}
              value={playerMarketValue}
            />
            <br />
            
    
            
    
            <button type="submit" >Add Here!</button>
    
            {/* {isLoading === true && <RingLoader className="spinner-container" color="red" />} */}
    
          </form>
        </div>
      );
    }
    
    export default CreatePlayer;