import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function OutlinedCard(info) {
    const name = info.name;
    const time = info.time;
    const review = info.review;

    const card = (
        // <Card sx={{ width: '70%' }}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {name} | {time}
                </Typography>
                <Typography sx={{ fontSize: 18 }} variant="body2" component="div">
                  {review.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < review.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </Typography>

            </CardContent>
        // </Card>

    );

    return (
        <Box sx={{minWidth: 275}}>
            <Card variant="outlined">{card}</Card>
        </Box>
    );

};



export default OutlinedCard