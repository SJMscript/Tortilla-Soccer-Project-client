import React, { useEffect, useState } from 'react';

const EstadiosList = () => {
  const [estadiosData, setEstadiosData] = useState([]);

  useEffect(() => {
    fetch('/api/utils/stadiums.json') // Ruta del backend que devuelve los datos del archivo JSON
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setEstadiosData(data)
        })
      .catch(error => console.error(error));
  }, []);

  

  return (
    <div>
      <h1>Lista de Estadios</h1>
      <ul>
        {estadiosData.map((estadio, index) => (
          <li key={index}>
            <h3>{estadio.name}</h3>
            <p>Ubicación: {estadio.ubicacion}</p>
            <p>Capacidad: {estadio.capacidad}</p>
            <a href={estadio.link} target="_blank" rel="noopener noreferrer">
              Más información
            </a>
            <img src={estadio.image} alt={estadio.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstadiosList;