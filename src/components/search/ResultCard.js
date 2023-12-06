import React from 'react';

// mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function MediaControlCard(data) {
    const movie = data.movie;
    return (
        <Link
                key ={movie._id}
                style={{ textDecoration: 'none', color: 'inherit' }}
                href={`/movie/${movie._id}`}
            >
            <Grid container spacing={2} gap={"40px"} style={{ marginTop: '20px' }}>
                <Card sx={{ display: 'flex', width: '700px', margin: '0 auto' }}>
                    <CardMedia
                        component="img"
                        sx={{width: 151}}
                        image={`https://image.tmdb.org/t/p/original/${movie.poster_url}`}
                        alt="movie poster"
                    />
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" variant="h5" sx={{ marginTop: '30px' }}>
                                {movie.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {movie.year}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {movie.genres.join(', ')}
                            </Typography>
                        </CardContent>

                    </Box>
                </Card>
            </Grid>
        </Link>
    );
}