import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions ,Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';
import Candlestick from './Candlestick';
//import data from './data';
import axios from 'axios';



function Story() {

    const [storyVisible, setStoryVisible] = useState(false);
    const [data ,setData]=useState([{ time: '2023-08-02', open: 131.23, high: 132.5, low: 130.1, close: 130.99 }]);

  

    const handleCardClick = () => {

      const apiKey='smPg0j4kXAb9tWkwQx5b3RITg6we_nuM';

      let url =`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-02-10?apiKey=${apiKey}`;
      
      axios.get(url).then((res) => {
        setData(res.data.results.map(item => {
        return {
            time: new Date(item.t).toISOString().split('T')[0], // Converts timestamp to 'YYYY-MM-DD' format
            open: item.o,
            high: item.h,
            low: item.l,
            close: item.c,
      }
    }
  )
  )

}).catch((err)=>console.log(err));

      setStoryVisible(true);

    };
  
    const handleCloseStory = () => {
      setStoryVisible(false);
    };


  return (

    <div className='StoryContainer' style={{"padding":"0 10px","width":"10vw"}}>
         <Card sx={{ maxWidth: 160 }} onClick={handleCardClick}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGNVRXO98rza3XrobXwNIvOoBF9oxBAkafg&s"
                    alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            Lizard
                        </Typography>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>B</Avatar>
                    </CardContent>
                </CardActionArea>
                
         </Card>

            <Dialog open={storyVisible} onClose={handleCloseStory}>
                    <div style={{ width: '500px', height: '500px' }}>
                        <Candlestick data={data} />
                    </div>
                    <DialogActions>
                        <Button onClick={handleCloseStory} color="primary">
                            Close
                        </Button>
                    </DialogActions>
            </Dialog>
        
    </div>
  )
}

export default Story;