import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ReviewCard from "./ReviewCard";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MovieCard from "../../homepage/MovieCard";

function ReviewDisplay(info) {
    const mid=info.mid;
	const [reviews, setReviews] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/movies/${mid}/reviews`);
          setReviews(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);


      return (
        <div>
          <div>
              {reviews &&
                reviews.map((r) => (
                  <Grid item key={r._id} style={{margin: 'auto', marginTop:'40px', width:'80%'}}>
                      <ReviewCard name={r.user_name} time={r.created_at} review={r.content} />
                  </Grid>
                ))}
          </div>
        </div>
      );
}


export default ReviewDisplay;