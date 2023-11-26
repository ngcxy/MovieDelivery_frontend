import MoviesTrending from "../components/MoviesTrending";
import MoviesNew from "../components/MoviesNew";
import Grid from '@mui/material/Grid';
import React from "react";

function HomePage() {

    return (
        <div>
          <h1>This is homepage</h1>
      <Grid container>
        {/* First Row */}
        {/*  <h1>Trending Movies</h1>*/}
        <Grid item xs={12}>
          <MoviesTrending/>
        </Grid>

        {/* Second Row */}
        <Grid item xs={12}>
          <MoviesNew/>
        </Grid>

        {/* Fourth Row */}
        <Grid item xs={12} md={4}>
          {/* Your content for the fourth section */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Another content for the fourth section */}
        </Grid>
        <Grid item xs={12} md={4}>
          {/* Another content for the fourth section */}
        </Grid>
      </Grid>
    </div>
    )
}

export default HomePage;
