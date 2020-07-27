import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Favorite(props) {
  const variable = {
    userFrom: props.userFrom,
    movieId: props.movieId,
    movieTitle: props.movieInfo.original_title,
    movieImage: props.movieInfo.backdrop_path,
    movieRunTime: props.movieInfo.runtime,
  };

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorite] = useState(false);

  const onClickFavorite = () => {
    if (!favorited) {
      axios
        .post('http://localhost:5000/favorites/addToFavorite', variable)
        .then((res) => {
          if (res.data.success) {
            setFavoriteNumber(favoriteNumber + 1);
            setFavorite(!favorited);
          } else {
            //alert('Fail to add to favorite!');
          }
        });
    } else {
      axios
        .post('http://localhost:5000/favorites/removeFromFavorite', variable)
        .then((res) => {
          if (res.data.success) {
            setFavoriteNumber(favoriteNumber - 1);
            setFavorite(!favorited);
          } else {
            //alert('Fail to remove to favorite!');
          }
        });
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/favorites/favoriteNumber', variable)
      .then((res) => {
        if (res.data) {
          setFavoriteNumber(res.data.FavoriteNumber);
        } else {
          //console.log();
        }
      });

    axios
      .get('http://localhost:5000/favorites/favorited', variable)
      .then((res) => {
        if (res.data) {
          setFavorite(res.data.favorited);
        } else {
          //alert('error!');
        }
      });
  }, []);
  return (
    <Button onClick={onClickFavorite}>
      {favorited ? 'Remove' : 'Add to Favorite'} {favoriteNumber}
    </Button>
  );
}

export default Favorite;
