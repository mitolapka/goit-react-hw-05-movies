import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isCastVisible, setIsCastVisible] = useState(false);
  const [areReviewsVisible, setAreReviewsVisible] = useState(false);
  const [movieImage, setMovieImage] = useState(null); 
  useEffect(() => {
    const apiKey = '37e7d95cf2428fca838e6974f910059b'; 
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
    const reviewsUrl = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`;

    const fetchMovieDetails = async () => {
      try {
        const [detailsResponse, castResponse, reviewsResponse] = await Promise.all([
          fetch(movieDetailsUrl),
          fetch(castUrl),
          fetch(reviewsUrl),
        ]);

        const detailsData = await detailsResponse.json();
        const castData = await castResponse.json();
        const reviewsData = await reviewsResponse.json();

        setMovieDetails(detailsData);
        setCast(castData.cast);
        setReviews(reviewsData.results);

        // Отримуємо URL зображення фільму
        if (detailsData.poster_path) {
          const imageUrl = `https://image.tmdb.org/t/p/w500${detailsData.poster_path}`;
          setMovieImage(imageUrl);
        }
      } catch (error) {
        console.error('Error loading movie data:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      <button onClick={() => window.history.back()}>Back</button>
      {movieDetails && (
        <div>
          <div className='additional-info div-add'>
            {movieImage && <img src={movieImage} alt={movieDetails.title} className='img-info'/>}
            <div className='info-about-film'>
          <h2>{movieDetails.title}</h2>
          <p>User score: {movieDetails.vote_average}</p>
          <h3>Overview:</h3><p>{movieDetails.overview}</p>
          <h3>Genres:</h3><p> {movieDetails.genres.map((genre) => genre.name).join(', ')}</p>
            </div>
          </div>
<div className='additional-info'>
          <h3>Additional Information:</h3>
          <ul className='additional-info-ul'>
            <li className='additional-info-li-cast'>
              <button onClick={() => setIsCastVisible(!isCastVisible)}>
                Cast
              </button>
              {isCastVisible && (
                <ul className="show">
                    {cast.map((actor) => (
                      <li key={actor.id} className="cast-item">
                        <div className="cast-item-info">
                          <div className="cast-item-image">
                            {actor.profile_path && (
                              <img
                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                alt={`${actor.name}'s profile`}
                              />
                            )}
                          </div>
                          <div className="cast-item-details">
                            <p>{actor.name}</p>
                            <p>Character: {actor.character}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
              )}
            </li>
            <li>
              <button onClick={() => setAreReviewsVisible(!areReviewsVisible)}>
                Reviews
              </button>
              {areReviewsVisible && (
                <ul>
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <li key={review.id}>
                        <p>{review.author}</p>
                        <p>{review.content}</p>
                      </li>
                    ))
                  ) : (
                    <p>No reviews available.</p>
                  )}
                </ul>
              )}
            </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
