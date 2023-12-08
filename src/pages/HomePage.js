import React from "react";
import MoviesTrending from "../components/homepage/MoviesTrending";
import MoviesNew from "../components/homepage/MoviesNew";
import MovieInList from "../components/homepage/MovieInList";
import CoverBlock from "../components/homepage/CoverBlock";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function HomePage() {
  const user = localStorage.getItem('user');
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
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

            {!user ? (
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Typography variant="h4">
                            Login To View Your Movie List!
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={scrollToTop}
                            style={{ marginTop: '10px' }}
                        >
                            Go to Top
                        </Button>
                    </Grid>
                ) : (
                    <Grid item xs={12}>
                        <MovieInList/>
                    </Grid>
                )}
          </Grid>
        </div>
    )
}

export default HomePage;