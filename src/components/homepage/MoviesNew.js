import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from "./MovieCard";

//mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function MoviesNew() {
	const [data, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/movies');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

      return (
        <div style={styles.container}>
          <Typography variant="h5" gutterBottom>
            Newest Added
          </Typography>
          <div style={styles.scrollContainer}>
              {data &&
                data.map((m) => (
                  <Grid item key={m._id} style={styles.gridItem}>
                      <MovieCard movie={m} />
                  </Grid>
                ))}
          </div>
        </div>
      );
}

const styles = {
  container: {
    padding: '16px',
  },
  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
    // whiteSpace: 'nowrap',
  },
  gridItem: {
    flex: '0 0 auto',
    width: '200px',
    marginRight: '16px',
  },
};

export default MoviesNew;