import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, Link} from 'react-router-dom';

export default function RecommendForm() {
    const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted!")
    navigate('/');
    // Add logic here to handle form submission, e.g., sending data to the server
      console.log('Form submitted!');

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
      <TextField id="movieTitle" label="Movie Title" variant="outlined" required style={{marginTop: '20px',}}/>
      <br/>
      <TextField id="imdbId" label="IMDb ID" variant="outlined" required style={{marginTop: '10px',}}/>
       <br/>
      <TextField id="reason" label="Reason" variant="outlined" multiline rows={4} required style={{marginTop: '10px',}}/>
       <br/>
      <Button type="submit" variant="contained" style={{ marginTop: '10px', backgroundColor: '#006d77', color: 'white' }}>
        Submit
      </Button>
    </Box>
  );
}