import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {config} from "../../config";
import MovieCard from "./MovieCard";

//mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function MoviesNew() {
	const [data, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${config.apiUrl}/movies`);
          const sortedData = response.data.sort((a, b) => {
            // sorted with create date
            const createTimeA = new Date(a.create_time);
            const createTimeB = new Date(b.create_time);

            if (createTimeA !== createTimeB) {
              return createTimeB - createTimeA;
            }

            // sort with year in descending
            const yearA = a.year;
            const yearB = b.year;
            if (yearA !== yearB) {
              return yearB - yearA;
            }

            // sort with release date if years are the same
            const dateA = a.primary_release_date ? new Date(a.primary_release_date) : 0;
            const dateB = b.primary_release_date ? new Date(b.primary_release_date) : 0;
            if (dateA !== dateB) {
              return dateB - dateA;
            }

            // compare with letters if all others are the same
            return a.title.localeCompare(b.title);
          });
          setData(sortedData);
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