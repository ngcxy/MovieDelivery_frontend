import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {config} from "../../config";
import MovieCard from "./MovieCard";

//mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function MoviesTrending() {
	const [data, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${config.apiUrl}/movies`);
          const sortedData = response.data.sort((a, b) => {
            // calculate ratio
            const ratioA = a.like / (a.like + a.dislike);
            const ratioB = b.like / (b.like + b.dislike);

            // compare, consider NaN
            if (!isNaN(ratioA) && !isNaN(ratioB) && ratioA !== ratioB) {
              return ratioB - ratioA;
            }

            // sort with like if ratios are the same
            if (a.like !== b.like) {
              return b.like - a.like;
            }

            // sort with -dislike if likes & ratios are both the same
            return a.dislike - b.dislike;
          });
          setData(sortedData.slice(0, 10));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);


      return (
        <div style={styles.container}>
          <Typography variant="h5" gutterBottom>
            Top Movies
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

export default MoviesTrending;