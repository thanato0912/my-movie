import React, { useEffect, useState } from 'react';
import { Descriptions, Row, Button } from 'antd';
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';
import Favorites from './Sections/Favorites';
import { movieAPIKey, movieURI, imageURL } from '../../config';

function MovieDetails(props) {
  const [movie, setMovie] = useState([]);
  const [actors, setActors] = useState([]);
  const [actorToggle, setActorToggle] = useState(false);
  const movieId = props.match.params.movieId;

  useEffect(() => {
    fetch(`${movieURI}movie/${movieId}?api_key=${movieAPIKey}&language=en-US`)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
        fetch(
          `${movieURI}movie/${movieId}/credits?api_key=${movieAPIKey}&language=en-US`
        )
          .then((res) => res.json())
          .then((res) => setActors(res.cast));
      });
  }, []);

  const handleToggle = () => {
    setActorToggle(!actorToggle);
  };

  return (
    <div>
      {/*Head*/}
      <div style={{ width: '100%' }}>
        {movie && (
          <MainImage
            image={`${imageURL}w1280${movie.backdrop_path}`}
            title={movie.original_title}
            text={movie.overview}
          />
        )}
      </div>

      {/*Body*/}
      <div style={{ width: '80%', margin: '1rem auto' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Favorites
            userFrom={localStorage.getItem('userId')}
            movieId={movieId}
            movieInfo={movie}
          />
        </div>

        <Descriptions title='Movie Info' bordered>
          <Descriptions.Item style={{ textColor: 'green' }} label='Title'>
            {movie.original_title}
          </Descriptions.Item>
          <Descriptions.Item label='release_date'>
            {movie.release_date}
          </Descriptions.Item>
          <Descriptions.Item label='revenue'>{movie.revenue}</Descriptions.Item>
          <Descriptions.Item label='runtime'>{movie.runtime}</Descriptions.Item>
          <Descriptions.Item label='vote_average' span={2}>
            {movie.vote_average}
          </Descriptions.Item>
          <Descriptions.Item label='vote_count'>
            {movie.vote_count}
          </Descriptions.Item>
          <Descriptions.Item label='status'>{movie.status}</Descriptions.Item>
          <Descriptions.Item label='popularity'>
            {movie.popularity}
          </Descriptions.Item>
        </Descriptions>

        {/*Actors Button*/}
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '1%' }}
        >
          <Button onClick={handleToggle}>Actors</Button>
        </div>

        {/* Grid for actors*/}
        {actorToggle && (
          <Row gutter={[24, 24]}>
            {actors &&
              actors.map((actor, index) => (
                <React.Fragment>
                  {actor.profile_path && (
                    <GridCard
                      key={index}
                      actor
                      image={`${imageURL}w500${actor.profile_path}`}
                    />
                  )}
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
