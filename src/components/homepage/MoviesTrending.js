import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from "./MovieCard";

//mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function MoviesTrending() {
	const [data, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/movies');
          console.log(response.data);
          const sortedData = response.data.sort((a, b) => {
            // 计算喜欢的比率
            const ratioA = a.like / (a.like + a.dislike);
            const ratioB = b.like / (b.like + b.dislike);
    
            // 比较比率，考虑 NaN 的情况
            if (!isNaN(ratioA) && !isNaN(ratioB) && ratioA !== ratioB) {
              return ratioB - ratioA; // 降序排序
            }
    
            // 如果比率相同或无法计算，则按 like 数量排序
            if (a.like !== b.like) {
              return b.like - a.like;
            }
    
            // 如果 like 数量也相同，则按 dislike 数量反向排序
            return a.dislike - b.dislike;
          });
          setData(sortedData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    console.log(data);


      return (
        <div style={styles.container}>
          <Typography variant="h5" gutterBottom>
            Top Movies
          </Typography>
          <div style={styles.scrollContainer}>
              {data &&
                data.map((m) => (
                  <Grid item key={m.mid} style={styles.gridItem}>
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