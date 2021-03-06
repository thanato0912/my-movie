import React from 'react';
import { Col } from 'antd';

function GridCard(props) {
  //in case showing movie details
  if (props.actor) {
    return (
      <Col key={props.key} lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <img
            style={{ width: '100%', height: '320px' }}
            alt=''
            src={props.image}
          />
        </div>
      </Col>
    );
  } else {
    //in case showing movies
    return (
      <Col key={props.key} lg={6} md={8} xs={24}>
        <div style={{ position: 'relative' }}>
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: '100%', height: '320px' }}
              alt=''
              src={props.image}
            />
          </a>
        </div>
      </Col>
    );
  }
}

export default GridCard;
