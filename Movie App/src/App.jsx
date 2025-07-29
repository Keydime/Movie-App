import Search from './Components/Search'
import { useState, useEffect } from 'react'
import LoadingSpinner from './Components/LoadingSpinner.jsx'
import MovieCard from './Components/MovieCard.jsx'
import {useDebounce} from 'react-use'
import { updateSearchCount } from './appwrite.js'


const API_KEY_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
}

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage,setErrorMessage] = useState('')
  const [movieList,setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])
  
  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    setErrorMessage('')

    try{
      const endpoint = query 
      ? `${API_KEY_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
      : `${API_KEY_URL}/discover/movie?sort_by=popularity.desc&language=en-US&page=1&include_adult=false`
      
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Failed to fetch Movies')
      }

      const data = await response.json()
      
      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'No movies found. Please try a different search.')
        setMovieList([])
        return;
      }

      setMovieList(data.results || [])

      if(query && data.results.length > 9) {
        await updateSearchCount(query, data.results[0])
      }
    } catch (error) { 
      console.error(`Error fetching movies:, ${error}`)
      setErrorMessage('Failed to fetch movies. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])
  

  return (
    <main> 
      <div className='pattern'>

        <header className='wrapper'>
          <img src="./hero-img.png" alt="Hero Banner"></img>
          <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>


          {isLoading ? (
          <LoadingSpinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center mt-8">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>

      </div>
    </main>
  )
}

export default App