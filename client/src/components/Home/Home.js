import React, { useState, useEffect } from 'react';
import { Typography, Row } from 'antd';
import GridCard from './Sections/GridCard';
import MainImage from './Sections/MainImage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { movieAPIKey, movieURI, imageURL } from '../../config';
const { Title } = Typography;

function Home() {
  const [movies, setMovies] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const endpoint = `${movieURI}movie/popular?api_key=${movieAPIKey}&language=en-US&page=`;
    fetchMovies(endpoint + currentPage);
    setFetching(true);
  }, []);

  const fetchMovies = (path) => {
    fetch(path)
      .then((res) => res.json())
      .then((res) => {
        setMovies([...movies, ...res.results]);
      });
  };

  const loadMore = () => {
    console.log(process.env.NODE_ENV);
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

        {/* Infinite Grid */}
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMore}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <Row gutter={[16, 16]}>
            {isFetching &&
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
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Home;
