import React, {useState, useEffect} from 'react';
import {Typography, Row, Button} from 'antd';
import GridCard from './Sections/GridCard';
import MainImage from './Sections/MainImage';

import {movieAPIKey, movieURI, imageURL} from '../../config';
const { Title } = Typography;



function Home() {

  const [movies, setmovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const endpoint = `${movieURI}movie/popular?movieAPIKey=${movieAPIKey}&language=en-US&page=`;
    fetchmovies(endpoint+currentPage);
  }, []);


  const fetchmovies = (path) => {
    fetch(path)
      .then(res => res.json())
      .then(res=> {
        //setmovies([...movies, ...res.results]);
        console.log(res.status_message);
      });
  }

  const loadMore = () => {
    const endpoint = `${movieURI}movie/popular?movieAPIKey=${movieAPIKey}&language=en-US&page=`;
    setCurrentPage(currentPage+1);
    fetchmovies(endpoint+currentPage);
  }

  const mainIndex = Math.floor(Math.random() * 20);
  return (

      <div style={{width: '100%', margin: 0}}>
        {/*Main LandingPage*/}
        {movies[0] &&
          <MainImage image={`${imageURL}w1280${movies[mainIndex].backdrop_path}`}
                     title={movies[mainIndex].original_title} text={movies[mainIndex].overview}/>
        }

        {/* Body */}
        <div style={{ width: '65%', margin:'1rem auto'}}>
          <Title level={1} type="secondary"> movies by latest</Title>
          <hr/>

          {/* Grid */}
          <Row gutter={[24,24]}>
            {movies && movies.map((movie, index) => (
              <React.Fragment>
                <GridCard key={index}
                  image={`${imageURL}w500${movie.poster_path}`}
                  movieId={movie.id}/>
              </React.Fragment>
            ))}
          </Row>

          {/*Load more*/}
          <br/>
          <div style={{display:'flex', justifyContent:'center'}}>
            <Button onClick={loadMore}>Load More</Button>
          </div>
        </div>


        <div>

        </div>
      </div>
  );
}

export default Home;
