import React, { use, useEffect, useState } from "react";
import Search from "./components/Search";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSetsearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Fetched movies:', data.results); // ✅ should log an array of movies
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    }
  };
  
  

  useEffect(() => {
    // Side effects or data fetching can be handled here
    fetchMovies();
  }, []);

  return (
    <main>
      <div className="pattern"/>

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSetsearchTerm={setSetsearchTerm}/>

        </header>

        <section className="all-movies">
          <h2 className="section-title">Movies</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          
        </section>

      </div>
    </main>
  )
}

export default App