import React from 'react';

//mui
import { Card, CardContent, CardMedia, Typography, CardActionArea, Link } from '@mui/material';

export default function MovieCard({movie}) {
  // console.log(movie);
  return (
    <Link
        style={{ textDecoration: 'none', color: 'inherit' }}
        href={`/movie/${movie._id}`}
    >
      <Card style={{ boxShadow: 'none' }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/original/${movie.poster_url}`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.year}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}