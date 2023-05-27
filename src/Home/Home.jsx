import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./home.css"

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, [currentPage]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
      setCharacters(response.data.results);
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
              <td>{index+1}</td>
              <td>
                <Link style={{textDecoration:'none',color:'black',cursor:'default'}} to={`/characters/${character.url.split('/')}`}>
                  {character.name}
                </Link>
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
      <div id='pagebtn'>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}>
          <i class="fa-sharp fa-solid fa-backward" style={{ color: 'black' }}></i>
        </button>
        {currentPage}
        <button onClick={() => handlePageChange(currentPage + 1)}>
          <i class="fa-sharp fa-solid fa-forward"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;
