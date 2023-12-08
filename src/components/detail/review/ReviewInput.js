import React, { useState } from 'react';
import axios from "axios";
import {config} from "../../../config";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function ReviewInput(info) {

  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("from review:: user is: " , user);
        if (!user) {
            alert("Please login first!");
        } else {
            await axios.post(`${config.apiUrl}/movies/${info.mid}/reviews`, {review: reviewText, uid: user.id, name: userName});
            console.log('Review submitted:', reviewText);
        }
    setReviewText('');
    setUserName('');
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { width: '70%', margin: 'auto' },
        display: 'flex',
        flexDirection: 'column',
        minHeight: '4rem',
      }}
      noValidate
    >
      <TextField
        type="text"
        style={{display: "none"}}
      />
        <TextField
        type="text"
        id="outlined-basic"
        label="Write Your Review"
        variant="outlined"
        autoComplete="off"
        multiline
        maxRows={4}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />
        <TextField
        type="text"
        id="outlined-basic"
        label="Enter Your Nickname"
        variant="outlined"
        autoComplete="off"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{marginTop: '10px',}}
      />
      <Button variant="contained" onClick={handleSubmit} style={{
          width: '40px',
          marginRight: '200px',
          marginTop: '10px',
          backgroundColor: '#006d77'
      }}>
        Submit
      </Button>
    </Box>
  );
}