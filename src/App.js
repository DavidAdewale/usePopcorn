import { useEffect, useState } from 'react';
import ErrorMessage from './components/ErrorMessage';
import Loader from './components/Loader';
import NavBar from './components/NavBar';
import NumResults from './components/NumResults';
import Main from './components/Main';
import Box from './components/Box';
import Search from './components/Search';
import WatchedMovieList from './components/WatchedMovieList';
import MovieDetails from './components/MovieDetails';
import WatchedSummary from './components/WatchedSummary';
import MovieList from './components/MovieList';
import { useMovies } from './useMovies';
import { useLocalStorageState } from './useLocalStorage';

export const KEY = `ec793eb9`;

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  // useEffect(function () {
  //   console.log('After inital render');
  // }, []);

  // useEffect(function () {
  //   console.log('After every Render');
  // });

  // console.log('During Render');

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />{' '}
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDelete={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
