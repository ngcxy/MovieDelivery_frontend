import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation} from "react-router-dom";

import ResultCard from "../components/search/ResultCard";

function SearchResult() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const q = queryParams.get('q');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const m = await axios.get(`http://localhost:4000/movies/search?q=${q}`);
          setMovies(m.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [q]);

    console.log(movies);

    if (movies) {
        return(
            <div>
                <h2>Search Result for "{q}"</h2>
                {movies.map(movies => <ResultCard movie={movies}/>)}
            </div>
        )
    }
    else {
        return (
            <p> No item found.</p>
        )
    }

}

export default SearchResult;