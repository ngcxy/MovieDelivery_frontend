import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import YouTube from 'react-youtube';
import axios from "axios";
import rt_icon from "../assets/rotten-tomato.png";
import imdb_icon from "../assets/imdb.png";
import thumbsup_icon from "../assets/thumbsup.png";

import ReviewInput from "../components/detail/review/ReviewInput";
import ReviewDisplay from "../components/detail/review/ReviewDisplay";
// import ReviewDisplay

import {Grid, Box, Fab} from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Typography from "@mui/material/Typography";

function MovieDetail(){
    let { _id } = useParams();
    const [info, setInfo] = useState(null);
    const [rating, setRating] = useState([]);
    const [provider, setProvider] = useState(null);
    const [video, setVideo] = useState("");
    const [review, setReview] = useState(null);
    const [isClickedList, setIsClickedList] = useState(false);
    const [isClickedLike, setIsClickedLike] = useState(false);
    const [isClickedDislike, setIsClickedDislike] = useState(false);

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

          const user = JSON.parse(localStorage.getItem("user"));
              if (user) {
                  const response_user = await axios.get(`http://localhost:4000/users/${user.id}`);
                  if (response_user.data.list_movie.includes(_id)){ setIsClickedList(true); }
                  if (response_user.data.like.includes(_id)){ setIsClickedLike(true); }
                  if (response_user.data.dislike.includes(_id)){ setIsClickedDislike(true); }
              }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

    const handleClickList = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please login first!");
        } else {
            if (isClickedList){
                await axios.delete(`http://localhost:4000/users/${user.id}/list`, {data: {mid: _id}});
                alert("Removed from your list");
                setIsClickedList(false);
            } else {
                await axios.post(`http://localhost:4000/users/${user.id}/list`, {mid: _id});
                alert("Added to your list");
                setIsClickedList(true);
            }
        }
    }

    const handleClickLike = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please login first!");
        } else {
            if (isClickedDislike){
                await axios.delete(`http://localhost:4000/users/${user.id}/dislike`, {data: {mid: _id}});
                setIsClickedDislike(false);
            }
            if (isClickedLike) {
                await axios.delete(`http://localhost:4000/users/${user.id}/like`, {data: {mid: _id}});
                setIsClickedLike(false);
            } else {
                await axios.post(`http://localhost:4000/users/${user.id}/like`, {mid: _id});
                setIsClickedLike(true);
            }
        }
    }

    const handleClickDislike = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            alert("Please login first!");
        } else {
            if (isClickedLike){
                await axios.delete(`http://localhost:4000/users/${user.id}/like`, {data: {mid: _id}});
                setIsClickedLike(false);
            }
            if (isClickedDislike) {
                await axios.delete(`http://localhost:4000/users/${user.id}/dislike`, {data: {mid: _id}});
                setIsClickedDislike(false);
            } else {
                await axios.post(`http://localhost:4000/users/${user.id}/dislike`, {mid: _id});
                setIsClickedDislike(true);
            }
        }
    }

    const ProviderList = (list, baseurl) => {
        const provider = list.provider;
        if (provider.length > 0) {
            const logo = provider.map(provider => `${baseurl}${provider.logo_path}`);
            const logo_img = logo.map(logo =>
                <a href={list.link}>
                    <img key={logo} src={`${baseurl}${logo}`} alt={"providers"}
                     style={{marginRight: '20px', width: '60px', height: '60px'}}/>
                </a>
            );
            return (
                <div>
                    {logo_img}
                    {/*<Typography sx={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', color: '#e29578'}}>*/}
                    {/*    See more provider information on <a href={list.link} style={{ color: '#006d77', textDecoration: 'underline' }}>TMDB</a>*/}
                    {/*</Typography>*/}
                </div>
            );
        }
        else {
            const title = info.title;
            const url = title.replace(/ /g, "-");
            return (
                <div>
                    <Typography sx={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', color: '#e29578'}}>
                    Movie provider information on <a href={`https://www.justwatch.com/us/movie/${url}`} style={{ color: '#006d77', textDecoration: 'underline' }}>JustWatch</a>
                    </Typography>
                </div>
            )
        }
    }

    const videoOpt = {
        height: '300',
        width: '530',
    };

    if (info){
        return(
            <Box sx={{ flexGrow: 1 }}>
                {/*-------first row-------*/}
                <Grid container spacing={2} gap={"40px"} style={{ marginTop: '20px' }}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={4}>
                        <img src={`https://image.tmdb.org/t/p/original/${info.poster_path}`} alt="Movie Poster"
                             style={{ width: '100%' , height: 'auto'}} />
                    </Grid>
                    <Grid item xs={5} style={{ marginBottom: '25px', marginTop: '20px' }}>
                        <Typography variant="h3" gutterBottom>
                          {info.title}
                        </Typography>
                        <Typography variant="h4" color="textSecondary" gutterBottom>
                          ({info.release_date.slice(0, 4)})
                        </Typography>

                        <Box sx={{ '& > :not(style)': { m: 1 } }} style={{ marginBottom: '100px', marginTop: '20px' }}>
                          <Fab
                              style={{
                                  backgroundColor: isClickedList ? '#e29578' : '#006d77',
                                  color: '#ffffff'}}
                              aria-label="add"
                              onClick={handleClickList}>
                            <BookmarkAddIcon />
                          </Fab>
                          <Fab
                              style={{
                                  backgroundColor: isClickedLike ? '#e29578' : '#006d77' ,
                                  color: '#ffffff'}}
                              aria-label="edit"
                              onClick={handleClickLike}>
                            <ThumbUpIcon />
                          </Fab>
                          <Fab
                              style={{
                                  backgroundColor: isClickedDislike ? '#e29578' : '#006d77' ,
                                  color: '#ffffff'}}
                              aria-label="edit"
                              onClick={handleClickDislike}>
                            <ThumbDownIcon />
                          </Fab>
                        </Box>

                            <Typography variant="body1" paragraph>
                              {info.overview} (tmdb)
                            </Typography>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>

                {/*-------second row-------*/}
                <Grid container spacing={2} gap={"40px"} style={{ marginBottom: '20px', marginTop: '20px' }}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={5} style={{
                        marginBottom: '20px',
                        marginTop: '30px' ,
                      }}>
                        <Typography variant="body1" style={{
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Arial, sans-serif',
                            fontSize: '30px',
                            fontWeight: 'bold'
                        }}>
                            <img src={thumbsup_icon} alt="Thumbs Up" style={{ marginLeft: '10px', marginRight: '5px', width: '60px', height: '60px' }} />
                            {rating.local}
                            <img src={rt_icon} alt="Rotten Tomatoes" style={{ marginLeft: '40px', marginRight: '20px', width: '50px', height: '50px' }} />
                            {rating.rt}
                            <img src={imdb_icon} alt="Rotten Tomatoes" style={{ marginLeft: '40px', marginRight: '20px', width: '60px', height: '60px' }} />
                            {rating.imdb}
                          </Typography>
                        <Box  style={{marginTop: '80px' }}>
                            {provider && ProviderList(provider, 'https://image.tmdb.org/t/p/original/')}
                        </Box>
                    </Grid>

                    <Grid item xs={5} overflowx="hide">
                        <YouTube videoId={video} opts={videoOpt}/>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
                {/*-------third row-------*/}
                <Grid container spacing={2} gap={"40px"}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={10} >
                        <Typography variant="h4" gutterBottom color='#006d77'>
                          Reviews
                        </Typography>
                        <ReviewInput mid={_id}/>
                        <br/>
                        <ReviewDisplay mid={_id}/>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>
            </Box>
        )
    }

}

export default MovieDetail