import { lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router"
import './index.css'
import App from './App.jsx'
const Movie = lazy(() => import('./Movie.jsx'))

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Suspense fallback={<p className="text-white text-center mt-5">Loading...</p>}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="movie/:movieId" element={<Movie />} />
            </Routes>
        </Suspense>
    </BrowserRouter>,
)
