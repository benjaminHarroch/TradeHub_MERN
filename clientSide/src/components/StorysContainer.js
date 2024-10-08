import React, { useEffect } from 'react'
import Slider from 'react-slick';
import Story from './Story';
import './css/StorysContainer.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function StorysContainer() {


  useEffect(()=>{

    

  },[])

  const stories=[{
        user:"benjamin",
        imageSrc:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.warriortrading.com%2Fhow-to-read-candlestick-charts%2F&psig=AOvVaw0axi0A8wMvtcFIJkiPjl6R&ust=1723631943743000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCg1t_j8YcDFQAAAAAdAAAAABAE",
        ticker:'LASE'
      },{
      user:"benjamin",
      imageSrc:"https://th.bing.com/th/id/R.8916a387421e246e900c047ce0e64c99?rik=juFHzVJhicvLXw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fBHK5E9%2ftheodor-herzl-1860-1904-writer-and-statesman-BHK5E9.jpg&ehk=CMtX5vIgHgkb%2bQjBI75QUFA%2b2f0ccpDatIWPhWNmzO8%3d&risl=&pid=ImgRaw&r=0",
      ticker:'MERC'
      },{
        user:"benjamin",
        imageSrc:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.warriortrading.com%2Fhow-to-read-candlestick-charts%2F&psig=AOvVaw0axi0A8wMvtcFIJkiPjl6R&ust=1723631943743000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCg1t_j8YcDFQAAAAAdAAAAABAE",
        ticker:'RLAY'
      },{
      user:"benjamin",
      imageSrc:"https://th.bing.com/th/id/R.8916a387421e246e900c047ce0e64c99?rik=juFHzVJhicvLXw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fBHK5E9%2ftheodor-herzl-1860-1904-writer-and-statesman-BHK5E9.jpg&ehk=CMtX5vIgHgkb%2bQjBI75QUFA%2b2f0ccpDatIWPhWNmzO8%3d&risl=&pid=ImgRaw&r=0",
      ticker:'RZLT'
    },{
      user:"benjamin",
      imageSrc:"https://th.bing.com/th/id/R.8916a387421e246e900c047ce0e64c99?rik=juFHzVJhicvLXw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fBHK5E9%2ftheodor-herzl-1860-1904-writer-and-statesman-BHK5E9.jpg&ehk=CMtX5vIgHgkb%2bQjBI75QUFA%2b2f0ccpDatIWPhWNmzO8%3d&risl=&pid=ImgRaw&r=0",
      ticker:'NFLX'
    },{
    user:"benjamin",
    imageSrc:"https://th.bing.com/th/id/R.8916a387421e246e900c047ce0e64c99?rik=juFHzVJhicvLXw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fBHK5E9%2ftheodor-herzl-1860-1904-writer-and-statesman-BHK5E9.jpg&ehk=CMtX5vIgHgkb%2bQjBI75QUFA%2b2f0ccpDatIWPhWNmzO8%3d&risl=&pid=ImgRaw&r=0",
    ticker:'SMMT'
    },{
      user:"benjamin",
      imageSrc:"https://th.bing.com/th/id/R.8916a387421e246e900c047ce0e64c99?rik=juFHzVJhicvLXw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fBHK5E9%2ftheodor-herzl-1860-1904-writer-and-statesman-BHK5E9.jpg&ehk=CMtX5vIgHgkb%2bQjBI75QUFA%2b2f0ccpDatIWPhWNmzO8%3d&risl=&pid=ImgRaw&r=0",
      ticker:'TERN'
    },{
    user:"benjamin",
    imageSrc:"https://th.bing.com/th/id/R.8916a387421e246e900c047ce0e64c99?rik=juFHzVJhicvLXw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fBHK5E9%2ftheodor-herzl-1860-1904-writer-and-statesman-BHK5E9.jpg&ehk=CMtX5vIgHgkb%2bQjBI75QUFA%2b2f0ccpDatIWPhWNmzO8%3d&risl=&pid=ImgRaw&r=0",
    ticker:'SEDG'
    },{
    user:"benjamin",
    imageSrc:"https://th.bing.com/th/id/R.8916a387421e246e900c047ce0e64c99?rik=juFHzVJhicvLXw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fBHK5E9%2ftheodor-herzl-1860-1904-writer-and-statesman-BHK5E9.jpg&ehk=CMtX5vIgHgkb%2bQjBI75QUFA%2b2f0ccpDatIWPhWNmzO8%3d&risl=&pid=ImgRaw&r=0",
    ticker:'TVTX'
    },{
      user:"benjamin",
      imageSrc:"https://th.bing.com/th/id/R.8916a387421e246e900c047ce0e64c99?rik=juFHzVJhicvLXw&riu=http%3a%2f%2fc8.alamy.com%2fcomp%2fBHK5E9%2ftheodor-herzl-1860-1904-writer-and-statesman-BHK5E9.jpg&ehk=CMtX5vIgHgkb%2bQjBI75QUFA%2b2f0ccpDatIWPhWNmzO8%3d&risl=&pid=ImgRaw&r=0",
      ticker:'XNCR'
      }]

    
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    

  return (

    <div className='slider-container'>

        <Slider {...settings}>
            {stories.map((story, index) => (
                    <Story key={index} ticker={story.ticker} username={story.username} imageSrc={story.imageSrc} />
            ))}

        </Slider>


       
    </div>
  );
}



export default StorysContainer;