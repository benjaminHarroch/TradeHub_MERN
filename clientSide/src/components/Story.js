import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { useState } from 'react';
import Candlestick from './Candlestick';
//import data from './data';
import axios from 'axios';
import './css/StorysContainer.css'



function Story({ticker}) {

    const [storyVisible, setStoryVisible] = useState(false);
    const [data ,setData]=useState([{ time: '2023-08-02', open: 131.23, high: 132.5, low: 130.1, close: 130.99 }]);

  

    const handleCardClick = () => {

      const apiKey='smPg0j4kXAb9tWkwQx5b3RITg6we_nuM';

      let url =`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2024-06-09/2024-09-10?apiKey=${apiKey}`;
      
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

    <div className='StoryContainer' >
         <Card sx={{ maxWidth: 180 }} onClick={handleCardClick}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    height="140"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrGNVRXO98rza3XrobXwNIvOoBF9oxBAkafg&s"
                    alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div" sx={{color:'orange',fontWeight:'800'}} >
                            {ticker} 
                        </Typography>
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