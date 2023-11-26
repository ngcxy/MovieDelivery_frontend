import React, {useEffect, useState} from 'react';
import axios from 'axios';

function MoviesTrending() {
	const [data, setData] = useState({
		posts: null,
	});

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/movies');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

// console.log(data);
	return (
		<div>
			<h1>Trending Movies</h1>
		</div>
	);
}

export default MoviesTrending;