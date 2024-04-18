import {useState, useEffect} from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';
const API_URL = "http://www.omdbapi.com?apikey=3293c15d";

const movie = {
    "Title": "The Matrix Revolutions",
    "Year": "2003",
    "imdbID": "tt0242653",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        // Will call the movie API
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('The Matrix');
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => {
                            return <MovieCard movie={movie} />
                        })}
                    </div>  
                ) : (
                    <div className='empty'>
                         <h2>No movies found</h2>
                    </div>
                    )}

            <div className='container'>
                <MovieCard movie={movie} />
            </div>
        </div>
    );
}

export default App;