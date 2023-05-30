import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./home.css"

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, [currentPage]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
      const sortedCharacters = response.data.results.sort((a, b) => a.name.localeCompare(b.name));
      setCharacters(sortedCharacters);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFavorite = async (name) => {
    try {
      await axios.post('http://localhost:3000/name', { name });

      setFavorites([...favorites, name]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetails = (name) => {
    const selected = characters.find((character) => character.name === name);
    setSelectedCharacter(selected);
  };

  return (
    <div>
      <h1>List</h1>
      <table>
        <thead>
          <tr>
            <th>slno</th>
            <th>name</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character, index) => (
            <tr key={character.name}>
              <td>{index + 1}</td>
              <td style={{cursor:'pointer'}} onClick={() => handleDetails(character.name)}>
                {character.name}
              </td>
              <td>
                <button id='fav' onClick={() => handleFavorite(character.name)}>
                  <i className="fa-sharp fa-solid fa-star"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCharacter && (
        <div id='details'>
          <h2>Selected Character Details:</h2>
          <p>Name: {selectedCharacter.name}</p>
          <p>Height: {selectedCharacter.height}</p>
          <p>Mass: {selectedCharacter.mass}</p>
          <p>Hair Color: {selectedCharacter.hair_color}</p>
          <p>Skin Color: {selectedCharacter.skin_color}</p>
          <p>Eye Color: {selectedCharacter.eye_color}</p>
          <p>Birth Year: {selectedCharacter.birth_year}</p>
          <p>Gender: {selectedCharacter.gender}</p>
        </div>
      )}
      <div id='pagebtn'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <i className="fa-sharp fa-solid fa-backward" style={{ color: 'black' }}></i>
        </button>
        {currentPage}
        <button onClick={() => handlePageChange(currentPage + 1)}>
          <i className="fa-sharp fa-solid fa-forward"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
