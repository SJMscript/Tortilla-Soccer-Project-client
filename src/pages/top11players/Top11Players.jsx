import { useState, useEffect } from "react"
import { createTop11Service } from "../../services/top11Players.services"
import { playerDetailsService } from "../../services/players.services"
import { useNavigate } from "react-router-dom"


function Top11Players() {


    const [ playerDetails, setPlayerDetails ] = useState(null)
    const [ top11PlayersList, setTop11PlayersList ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)

    
    useEffect(() => {
        getTop11PlayersData()
    }, [])

    
    
    
    
    const getTop11PlayersData = async () => { 
    
    
    
    
    
        try {
        

        
            
            const playerDetail = await playerDetailsService()
            console.log(playerDetail)
            const response = await createTop11Service()
            console.log(response, "response")
            setTop11PlayersList(response.data)
            setIsLoading(false)
            
            
            
            
        } catch (error) {
            console.error(error)
        }

    }
    
    if (isLoading) {
        return  <h3>Loading...</h3>
        
    }
    
    
    return (
        <div>

        <h3>Our 11 choosen</h3>

        {top11PlayersList.map((eachPlayer) => {
            
            return (
                <div key={eachPlayer._id}>
                    <li>{eachPlayer.name}{eachPlayer.imageUrl}{eachPlayer.postion}</li>
                </div>
            )
            
        })}

        {playerDetails.map((eachPlayer) => {
            return (
                <div key={eachPlayer._id}>
                    <h5>{eachPlayer.name}</h5>
                </div>
            )
        })}



    </div>
  )
}


export default Top11Players