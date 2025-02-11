import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const API_BASE_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const Movie = () => {
    const { movieId } = useParams();

    console.log(movieId);

    const [movie, setMovie] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchMovie = async () => {
        setIsLoading(true);
        setErrorMessage('');
        try {
            const endpoint = `${API_BASE_URL}/${movieId}?language=en-US`;
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }

            const data = await response.json();

            if (data.Response == 'False') {
                setErrorMessage(data.Error || 'Failed to fetch movies');
                setMovie('');
                return;
            }
            console.log(data);
            setMovie(data || '');
        } catch (error) {
            console.error(`Error fetching your movie: ${error}`)
            setErrorMessage('Error fetching movie. Please try again later');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (movieId) {
            fetchMovie();
        }
    }, [movieId])
    return (
        <main>
            <div className='pattern' />
            <div className='wrapper'>
                <header>
                    <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
                </header>
                <section className='all-movies mt-4'>
                    <h2>Movie Details</h2>
                    {isLoading ? (
                        <p className='text-white'>Loading...</p>
                    ) : errorMessage ? (
                        <p className='text-red-500'>{errorMessage}</p>
                    ) : movie ? (
                        <div className="flex flex-row justify-between px-4 py-2 gap-4">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className='h-auto w-60 rounded-2xl' loading='lazy' />
                            <div className='flex flex-col text-left text-white gap-5'>
                                <h3 className='text-4xl font-bold'>{movie.title}</h3>
                                <p className='text-2xl font-semibold'>{movie.overview}</p>
                                <p className='text-xl font-medium'>"{movie.tagline}"</p>
                                <p className='text-lg'><strong>Release Date:</strong> {movie.release_date}</p>
                                <p className='text-lg'><strong>Rating:</strong>{movie.vote_average?.toFixed(1)}</p>
                            </div>
                        </div>
                    ) : (
                        <p className='text-white'>No movie found.</p>
                    )}
                </section>
            </div>
        </main>
    )
}

export default Movie;
