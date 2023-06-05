import { useState, useEffect } from "react"
import { top11ListService } from "../../services/top11.services"
//import { createTop}


function Top11Players() {



    const [ top11PlayersList, setTop11PlayersList ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)



    useEffect(() => {
        getTop11PlayersData()
    }, [])

    const getTop11PlayersData = async () => {



        try {
            
            

            const response = await top11ListService()
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
            console.log(eachPlayer)
            return (
                <div key={eachPlayer._id}>
                    <li>
                    <h3>{eachPlayer.name}</h3>
                    <p>{eachPlayer.imageUrl}</p>
                    <p>{eachPlayer.playerPosition}</p>
                    </li>
                </div>
            )

        })}



    </div>
  )
}

export default Top11Players