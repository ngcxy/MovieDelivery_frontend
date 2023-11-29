import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import YouTube from 'react-youtube';
import axios from "axios";

import {Grid, Box, Fab} from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

function MovieDetail(){
    let { _id } = useParams();
    const [info, setInfo] = useState(null);
    const [rating, setRating] = useState([]);
    const [provider, setProvider] = useState(null);
    const [video, setVideo] = useState("");
    const [review, setReview] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response_info = await axios.get(`http://localhost:4000/movies/${_id}`);
          setInfo(response_info.data);
          const response_rating = await axios.get(`http://localhost:4000/movies/${_id}/ratings`);
          setRating(response_rating.data);
          const response_provider = await axios.get(`http://localhost:4000/movies/${_id}/providers`);
          setProvider(response_provider.data);
          // const response_review = await axios.get(`http://localhost:4000/movies/${_id}/reviews`);
          const response_video = await axios.get(`http://localhost:4000/movies/${_id}/videos`);
          setVideo(response_video.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

    const ProviderList = ({list, baseurl}) => {

    }

    const videoOpt = {
        height: '300',
        width: '520',
    };


    if (info){
        return(
            <Box sx={{ flexGrow: 1 }}>
                {/*-------first row-------*/}
                <Grid container spacing={2} gap={"40px"}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={`https://image.tmdb.org/t/p/original/${info.poster_path}`} alt="Movie Poster" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={6}>
                        <h1>{info.title}</h1>
                        <h1>({info.release_date})</h1>

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

                        <p>{info.overview}(tmdb)</p>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
                {/*-------second row-------*/}
                <Grid container spacing={2} gap={"40px"}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={5} >
                        <p>tomatometer: {rating.rt}, imdb: {rating.imdb}</p>
                        <p>provider</p>
                    </Grid>
                    <Grid item xs={5} >
                        <YouTube videoId={video} opts={videoOpt}/>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
                <Grid container spacing={2} gap={"40px"}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={5} >
                        <h2>Reviews</h2>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </Box>
        )
    }

}

export default MovieDetail