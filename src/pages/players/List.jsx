import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import {
  playersListService,
  playersLikesService,
  playersDislikesService,
} from "../../services/players.services";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "../../css/playersList.module.css";

function List() {
  const [playersList, setPlayersList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedPlayers, setLikedPlayers] = useState([]);

  useEffect(() => {
    getPlayersData();
  }, []);

  const getPlayersData = async () => {
    try {
      const response = await playersListService();
      console.log(response, "response");
      setPlayersList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToLikedPlayers = async (playerId) => {
    try {
      await playersLikesService(playerId);

      setLikedPlayers([...likedPlayers, playerId]);
      console.log("Player added to likedPlayers:", playerId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromLikedPlayers = async (playerId) => {
    try {
      await playersDislikesService(playerId);

      setLikedPlayers(likedPlayers.filter((id) => id !== playerId));
      console.log("Player removed from likedPlayers:", playerId);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  // Divide los jugadores en grupos de 3 para mostrar varios jugadores en cada slide
  const groupedPlayers = [];
  for (let i = 0; i < playersList.length; i += 2) {
    groupedPlayers.push(playersList.slice(i, i + 2));
  }

  return (
    <div className={styles.main}>
      <h3 className={styles.h3TitleList}>Lista de jugadores</h3>

      <div className={styles.playerList}>
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          swipeable={true}
          emulateTouch={true}
          showArrows={true}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                className="btn prev"
                onClick={onClickHandler}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "-40px",
                  transform: "translateY(-50%)",
                  zIndex: "1",
                }}
              >
               
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                className="btn next"
                onClick={onClickHandler}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "-40px",
                  transform: "translateY(-50%)",
                  zIndex: "1",
                }}
              >
                
              </button>
            )
          }
          renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <li
                  style={{
                    background: "#000",
                    width: "8px",
                    height: "8px",
                    borderRadius: "4px",
                    display: "inline-block",
                    margin: "0 4px",
                  }}
                  onClick={onClickHandler}
                  onKeyDown={onClickHandler}
                  value={index}
                  key={index}
                  role="button"
                  tabIndex={0}
                  title={`${label} ${index + 1}`}
                  aria-label={`${label} ${index + 1}`}
                />
              );
            }
            return (
              <li
                style={{
                  background: "#fff",
                  width: "8px",
                  height: "8px",
                  borderRadius: "4px",
                  display: "inline-block",
                  margin: "0 4px",
                }}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
              />
            );
          }}
        >
          {groupedPlayers.map((group, index) => (
            <div key={index}>
              {group.map((eachPlayer) => (
                <div className={styles.eachPlayerInList} key={eachPlayer._id}>
                  <li>
                    <Link className={styles.playerListName} to={`/players/${eachPlayer._id}/details`}>
                      <h3 className={styles.playerListName} >{eachPlayer.name}</h3>
                    </Link>
                    <p>Position: {eachPlayer.playerPosition}</p>
                    {eachPlayer.imageUrl && (
                      <div>
                        <img
                          src={eachPlayer.imageUrl}
                          alt="Player"
                          width={200}
                        />
                      </div>
                    )}
                    {likedPlayers.includes(eachPlayer._id) ? (
                      <button
                        onClick={() =>
                          handleRemoveFromLikedPlayers(eachPlayer._id)
                        }
                        style={{ fontSize: "24px", cursor: "pointer" }}
                      >
                        💔
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddToLikedPlayers(eachPlayer._id)}
                        style={{ fontSize: "24px", cursor: "pointer" }}
                      >
                        ❤️
                      </button>
                    )}
                  </li>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default List;