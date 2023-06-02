import axios from "axios"
import { useState, useEffect } from "react"
import { playersListService } from "../../services/players.services"


function List() {



    const [ playersList, setPlayersList ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)



    useEffect(() => {
        getPlayersData()
    }, [])

    const getPlayersData = async () => {



        try {
            
            

            const response = await playersListService()
            console.log(response, "response")
            setPlayersList(response.data)
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

        <h3>Lista de jugadores</h3>

        {playersList.map((eachPlayer) => {

            return (
                <div key={eachPlayer._id}>
                    <li>{eachPlayer.name}</li>
                </div>
            )

        })}



    </div>
  )
}

export default List