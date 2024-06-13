
import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_img from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTc2OWE4MzFkNDE0ZjU5ZTIxZDBjOGU5M2M2ZjU5MiIsInN1YiI6IjY1ZjZiNjM2YWUzODQzMDE3ZDQ5ZmJmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Iqr0nrscFoW2Io4ZnCv05r2g83GVpAhN93fBTxSAjfM'
    }
  };

  useEffect(() => {
    console.log("Fetching data for movie ID:", id);
    if (id) {
      fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(response => response.json())
        .then(response => {
          if (response.results && response.results.length > 0) {
            setApiData(response.results[0]);
          } else {
            console.error('No videos found for this movie.');
            setError('No videos found for this movie.');
          }
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching video data:', err);
          setError('Error fetching video data.');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading video...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="player">
      <img src={back_arrow_img} alt="Back" onClick={() => navigate(-1)} />
      {apiData.key ? (
        <>
          <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title="figure" frameBorder='0' allowFullScreen></iframe>
          <div className="player-info">
            <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : 'Unknown date'}</p>
            <p>{apiData.name}</p>
            <p>{apiData.type}</p>
          </div>
        </>
      ) : (
        <p>No video available.</p>
      )}
    </div>
  );
};

export default Player;