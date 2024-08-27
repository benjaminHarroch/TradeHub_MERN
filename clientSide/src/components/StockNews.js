import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardMedia, CardContent, Box, Grid, TextField, Pagination, InputAdornment } from '@mui/material';
import Slider from 'react-slick';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

// Styled components
const TitleSlider = styled(Slider)(({ theme }) => ({
    '& .slick-slide': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f3f4f6',
        borderRadius: '10px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    '& .slick-arrow': {
        fontSize: '20px',
        color: '#fff',
        '&:before': {
            color: '#000',
        },
    },
    '& .slick-arrow.slick-prev': {
        left: 0,
        zIndex: 1,
    },
    '& .slick-arrow.slick-next': {
        right: 0,
    },
}));

const NewsCard = styled(Card)(({ theme }) => ({
    borderRadius: '15px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: '0.3s',
    '&:hover': {
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
    },
}));

const NewsTitle = styled(Typography)(({ theme }) => ({
    transition: 'color 0.3s ease-in-out',
}));

const StockNews = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [stockFilter, setStockFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [page, setPage] = useState(1);
    const itemsPerPage = 30;
    

    useEffect(() => {
        axios.get('https://tradehub-mern.onrender.com/news')
            .then(response => {
                console.log(response)
                setNews(response);
                setFilteredNews(response);
            })
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitleIndex(prevIndex => (prevIndex + 1) % filteredNews?.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [filteredNews]);

    useEffect(() => {
        let filtered = news;

        if (stockFilter) {
            filtered = filtered?.filter(article =>
                article.headline.toLowerCase().includes(stockFilter.toLowerCase())
            );
        }

        if (dateFilter) {
            filtered = filtered?.filter(article =>
                new Date(article.datetime).toISOString().split('T')[0] === dateFilter
            );
        }

        setFilteredNews(filtered);
    }, [stockFilter, dateFilter, news]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };
    const handleClick=(url)=>{
        window.location.href =url;
    }

    const paginatedNews = filteredNews?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows:false,
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4, marginTop:'5%'}}>
                <TextField
                    label="Search by Stock Name"
                    variant="outlined"
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    sx={{ mb: 2, width: '100%', maxWidth: '400px' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    type="date"
                    variant="outlined"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    sx={{ mb: 4, width: '100%', maxWidth: '400px' }}
                />
            </Box>

            <Box sx={{ mb: 5, overflow: 'hidden' }}>
                <TitleSlider {...sliderSettings}>
                    {filteredNews?.map((article, index) => (
                        <Box key={index} sx={{ textAlign: 'center', p: 2, background: '#3897f0', color: '#fff', borderRadius: '10px',fontWeight:'900' }}>
                            <Typography variant="h6">{article.headline}</Typography>
                        </Box>
                    ))}
                </TitleSlider>
            </Box>

            <Grid container spacing={3}>
                {paginatedNews?.map((article, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <NewsCard>
                            {article.image && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={article.image}
                                    alt={article.headline}
                                    onClick={handleClick(article.url)}
                                />
                            )}
                            <CardContent>
                                <NewsTitle variant="h5">{article.headline}</NewsTitle>
                                <Typography variant="body2" color="text.secondary">
                                    {article.summary}
                                </Typography>
                            </CardContent>
                        </NewsCard>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={Math.ceil(filteredNews?.length / itemsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Container>
    );
};

export default StockNews;



