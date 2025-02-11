import React from 'react'
import { NavLink } from 'react-router-dom'

const MovieCard = ({ movie: { title, vote_average, poster_path, release_date, original_language, id } }) => {
    return (
        <div className='movie-card'>
            <NavLink
                to={`movie/${id}`}
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >
                <img
                    src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/no-movie.png`}
                />
            </NavLink>

            <div className='mt-4'>
                <h3>{title}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src='Rating.svg' alt='Star Icon' />
                        <p>{typeof vote_average === 'number' ? vote_average.toFixed(2) : 'N/A'}</p>
                    </div>

                    <span>•</span>
                    <p className='lang'>{original_language}</p>

                    <span>•</span>
                    <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
