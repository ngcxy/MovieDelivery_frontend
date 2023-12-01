import React from "react";
import MoviesTrending from "../components/homepage/MoviesTrending";
import MoviesNew from "../components/homepage/MoviesNew";
import MovieInList from "../components/homepage/MovieInList";
import Grid from '@mui/material/Grid';


function HomePage() {

    return (
        <div>
          <h1>This is homepage</h1>
          <Grid container>
            <Grid item xs={12}>
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
