import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link, useNavigate } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();
  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTc2OWE4MzFkNDE0ZjU5ZTIxZDBjOGU5M2M2ZjU5MiIsInN1YiI6IjY1ZjZiNjM2YWUzODQzMDE3ZDQ5ZmJmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Iqr0nrscFoW2Io4ZnCv05r2g83GVpAhN93fBTxSAjfM'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

    const currentCardsRef = cardsRef.current;

    if (currentCardsRef) {
      currentCardsRef.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentCardsRef) {
        currentCardsRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

  const handleCardClick = (id) => {
    navigate(`/player/${id}`);
  };

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData && apiData.map((card, index) => (
          <div className="card" key={index} onClick={() => handleCardClick(card.id)}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
