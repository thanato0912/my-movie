import React from 'react';
import {Typography} from 'antd';
const {Title} = Typography;

function MainImage(props) {
  return (

    <div style={{
        background: `url("${props.image}"), #1c1c1c`,
        height: '500px',
        backgroundSize: '100%, cover',
        backgroundPosition: 'center, center',
        width: '100%',
        position: 'relative'
      }}>
      <div style={{position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '2rem'}}>
        <Title style={{color:'white'}} level={2}>{props.title}</Title>
        <p style={{color:'white', fontSize: '1rem'}}>{props.text}</p>
      </div>
    </div>

  );
}

export default MainImage;
