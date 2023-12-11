import * as React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, Link} from 'react-router-dom';
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {config} from "../config";

export default function RecommendForm() {

    const [title, setTitle] = useState('');
    const [id, setId] = useState('');
    const [reason, setReason] = useState('');

    const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`${config.apiUrl}/recommendations`,
        {title: title, IMDB_id: id, reason: reason}
    );
    alert("Form submitted!")
    setReason('');
    setTitle('');
    setId('');
    navigate('/');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& > :not(style)': {
            m: 1,
            width: '50%',
            margin: 'auto',
            display: 'flex', },
      }}
      noValidate
      autoComplete="off"
    >
        <Typography variant="h6" gutterBottom color='#006d77' style={{marginTop: '10px',}}>
          Submit this form to recommend new movies to us!
        </Typography>
      <TextField
          id="movieTitle"
          label="Movie Title"
          variant="outlined"
          required style={{marginTop: '20px',}}
          onChange={(e) => setTitle(e.target.value)}
      />
      <br/>
      <TextField
          id="imdbId"
          label="IMDb ID"
          variant="outlined"
          required style={{marginTop: '10px',}}
          onChange={(e) => setId(e.target.value)}
      />
       <br/>
      <TextField
          id="reason"
          label="Reason"
          variant="outlined"
          multiline rows={4}
          required style={{marginTop: '10px',}}
          onChange={(e) => setReason(e.target.value)}
      />
       <br/>
      <Button type="submit" variant="contained" style={{ marginTop: '10px', backgroundColor: '#006d77', color: 'white' }}>
        Submit
      </Button>
    </Box>
  );
}