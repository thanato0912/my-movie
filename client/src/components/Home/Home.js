import React, { useState, useEffect } from 'react';
import { Typography, Row, Button } from 'antd';
import GridCard from './Sections/GridCard';
import MainImage from './Sections/MainImage';

import { movieAPIKey, movieURI, imageURL } from '../../config';
const { Title } = Typography;

function Home() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const endpoint = `${movieURI}movie/popular?api_key=${movieAPIKey}&language=en-US&page=`;
    fetchMovies(endpoint + currentPage);
  }, []);

  const fetchMovies = (path) => {
    fetch(path)
      .then((res) => res.json())
      .then((res) => {
        setMovies([...movies, ...res.results]);
      });
  };

  const loadMore = () => {
    const endpoint = `${movieURI}movie/popular?api_key=${movieAPIKey}&language=en-US&page=`;
    fetchMovies(endpoint + (currentPage + 1));
    setCurrentPage(currentPage + 1);
  };

  const mainIndex = Math.floor(Math.random() * 20);
  return (
    <div style={{ width: '100%', margin: 0 }}>
      {/*Main LandingPage*/}
      {movies[0] && (
        <MainImage
          image={`${imageURL}w1280${movies[mainIndex].backdrop_path}`}
          title={movies[mainIndex].original_title}
          text={movies[mainIndex].overview}
        />
      )}

      {/* Body */}
      <div style={{ width: '65%', margin: '1rem auto' }}>
        <Title level={2} type='secondary'>
          Now Trending
        </Title>
        <hr />

        {/* Grid */}
        <Row gutter={[16, 16]}>
          {movies &&
            movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCard
                  image={
                    movie.poster_path && `${imageURL}w500${movie.poster_path}`
                  }
                  movieId={movie.id}
                />
              </React.Fragment>
            ))}
        </Row>

        {/*Load more*/}
        <br />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={loadMore}>Load More</Button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Home;
