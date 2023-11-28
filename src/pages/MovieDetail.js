import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

import {Grid, Box, Fab} from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function MovieDetail(){
    let { _id } = useParams();
    const [data, setData] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/movie/${_id}`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    if (data){
        return(
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="Movie Poster" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={6}>
                    <h1>{data.title}</h1>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                          <Fab color="primary" aria-label="add">
                            <BookmarkAddIcon />
                          </Fab>
                          {/*  <Fab color="primary" aria-label="add">*/}
                          {/*  <BookmarkRemoveIcon />*/}
                          {/*</Fab>*/}
                          <Fab color="primary" aria-label="edit">
                            <ThumbUpIcon />
                          </Fab>
                          <Fab color="primary" aria-label="edit">
                            <ThumbDownIcon />
                          </Fab>
                        </Box>
                    </Grid>
                <Grid item xs={1}>
                </Grid>
                </Grid>
            </Box>
        )
    }

}

export default MovieDetail