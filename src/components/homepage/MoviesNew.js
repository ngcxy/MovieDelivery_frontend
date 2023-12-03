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
          const sortedData = response.data.sort((a, b) => {
            // 按 creat_time 降序排序
            const createTimeA = new Date(a.creat_time['$date']).getTime();
            const createTimeB = new Date(b.creat_time['$date']).getTime();

            if (createTimeA !== createTimeB) {
              return createTimeB - createTimeA;
            }

            // 按 year 降序排序
            const yearA = a.year;
            const yearB = b.year;
            if (yearA !== yearB) {
              return yearB - yearA;
            }

            // 如果 year 相同，按 primary_release_date 排序
            const dateA = a.primary_release_date ? new Date(a.primary_release_date).getTime() : 0;
            const dateB = b.primary_release_date ? new Date(b.primary_release_date).getTime() : 0;
            if (dateA !== dateB) {
              return dateB - dateA;
            }

            // 如果 primary_release_date 相同或不存在，按 title 字母顺序排序
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
                  <Grid item key={m.mid} style={styles.gridItem}>
                      <MovieCard key={m.mid} movie={m} />
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