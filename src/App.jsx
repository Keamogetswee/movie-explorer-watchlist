import React, { use, useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount } from "./appwrite";

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
  const [moviesList, setMoviesList] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce the search term to prevent excessive API calls
  // by waiting for the user to stop typing for 500ms
  useDebounce(
    () => 
      setDebouncedSearchTerm(searchTerm)
    ,
    500,
    [searchTerm]
  );

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
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
      if(data.Response === "False") {
        setErrorMessage(data.Error || "No movies found.");
        setMoviesList([]);
        return;
      }
      setMoviesList(data.results || []);
      updateSearchCount()
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  

  useEffect(() => {
    // Side effects or data fetching can be handled here
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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
          <h2 className="mt-[40px]">All Movies</h2>
          {isloading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} /> 
              ))}
            </ul>
          )}
          
        </section>

      </div>
    </main>
  )
}

export default App