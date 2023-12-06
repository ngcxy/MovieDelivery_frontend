import React from "react";
import MoviesTrending from "../components/homepage/MoviesTrending";
import MoviesNew from "../components/homepage/MoviesNew";
import MovieInList from "../components/homepage/MovieInList";
import CoverBlock from "../components/homepage/CoverBlock";
import Grid from '@mui/material/Grid';


function HomePage() {

    return (
        <div>
            <br/>
          <Grid container style={{ marginBottom: '25px' }} >
            <Grid item xs={12}>
              <CoverBlock/>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} >
              <MoviesTrending/>
            </Grid>

            <Grid item xs={12}>
              <MoviesNew/>
            </Grid>

            <Grid item xs={12}>
              <MovieInList/>
            </Grid>
          </Grid>
        </div>
    )
}

export default HomePage;
