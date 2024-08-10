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
                    image="https://th.bing.com/th/id/R.8916a387421e246e900c047ce0e64c99?rik=juFHzVJhicvLXw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fBHK5E9%2ftheodor-herzl-1860-1904-writer-and-statesman-BHK5E9.jpg&ehk=CMtX5vIgHgkb%2bQjBI75QUFA%2b2f0ccpDatIWPhWNmzO8%3d&risl=&pid=ImgRaw&r=0"
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