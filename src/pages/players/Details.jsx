//import axios from "axios"
import { useState, useEffect } from "react"
import { playerDetailsService } from "../../services/players.services"
import { useParams } from "react-router-dom"


function Details() {



    const [ playerDetails, setPlayerDetails ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)

    const { playerId } = useParams()

    useEffect(() => {
        getPlayerDetailData()
    }, [])

    const getPlayerDetailData = async () => {



        try {
            
            

            const response = await playerDetailsService(playerId)
            console.log(response, "response")
            setPlayerDetails(response.data)
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

        <h1>Player Details</h1>

        <div>
            <h4>{playerDetails.name}</h4>
            <br />
            <p>{playerDetails.age}</p>
            <hr />
            <p>{playerDetails.currentTeam}</p>
            <p>{playerDetails.skillfulLeg}</p>

        </div>

    </div>
  )
}

export default Details