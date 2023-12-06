import React, {useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from "./MovieCard";

//mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


function MoviesInList() {
	const [data, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userInfo = localStorage.getItem('user');
                if (userInfo) {
                    const user = JSON.parse(userInfo); // 假设 userInfo 是一个 JSON 字符串
                    const userId = user._id; // 或者 user 中的任何字段来表示用户的 ID

                    // 使用用户 ID 发起请求
                    const response = await axios.get(`http://localhost:4000/list/${userId}`);
                    setData(response.data);
                }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

      return (
        <div style={styles.container}>
          <Typography variant="h5" gutterBottom>
            My Watchlist
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

export default MoviesInList;