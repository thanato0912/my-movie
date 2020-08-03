import React, { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import { Popover } from 'antd';
import axios from 'axios';
import { imageURL } from '../../config';
import './favorite.css';

const { Title } = Typography;

function MyFavorites() {
  const variables = { userFrom: localStorage.getItem('userId') };
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/users/auth', {
        withCredentials: true,
        mode: 'cors',
      })
      .then(
        (res) => {
          if (!res.data.loginSuccess) {
            alert('Please log in first!');
            window.location = '/';
          }
        },
        (err) => {
          alert(err);
          window.location = '/';
        }
      );
    axios
      .post('http://localhost:5000/favorites/getFavoriteMovies', variables)
      .then((res) => {
        if (res.data.success) {
          setFavorites(res.data.favorites);
        } else {
          alert('failed to retrieve favorite movies!');
        }
      });
  }, []);

  const onClickRemove = (movieId, i) => {
    const variable = {
      movieId: movieId,
      userFrom: localStorage.getItem('userId'),
    };
    axios
      .post('http://localhost:5000/favorites/removeFromFavorite', variable)
      .then((res) => {
        if (res.data.success) {
          setFavorites(favorites.filter((el) => el.movieId !== movieId));
        } else {
          alert('Fail to remove to favorite!');
        }
      });
  };

  const renderTableBody = favorites.map((movie, index) => {
    console.log(index);
    const content = (
      <div>
        {movie.moviePost ? (
          <img src={`${imageURL}w500${movie.moviePost}`} alt='moviePost' />
        ) : (
          'no image'
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${movie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRunTime}</td>
        <td>
          <Button onClick={() => onClickRemove(movie.movieId)}>remove</Button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: '85%', margin: '2rem auto' }}>
      <Title level={2} style={{ color: '#001f3f' }}>
        My Favorite Movies
      </Title>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Runtime</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{renderTableBody}</tbody>
      </table>
    </div>
  );
}

export default MyFavorites;
