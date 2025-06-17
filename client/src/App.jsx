import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RecentMoviesCarousel from './components/RecentMoviesCarousel';
import MovieGrid from './components/MovieGrid';
import FilterBar from './components/FilterBar';
import Footer from './components/Footer';
//import { movies, genres } from './data/movies';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  const featuredMovie = movies.find(movie => movie.featured) || movies[0];

  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = selectedGenre === 'All' || movie.genre.includes(selectedGenre);
      
      return matchesSearch && matchesGenre;
    });

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'year':
          return parseInt(b.release_year) - parseInt(a.release_year);
        case 'rating':
          return parseFloat(b.imdb) - parseFloat(a.imdb);
        case 'duration':
          return parseInt(b.duration_minutes) - parseInt(a.duration_minutes);
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, selectedGenre, sortBy]);

  const getMovieGridTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    }
    if (selectedGenre !== 'All') {
      return `${selectedGenre} Movies`;
    }
    return 'All Movies';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main>
        <Hero movie={featuredMovie} />
        
        <RecentMoviesCarousel movies={movies} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FilterBar
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          
          <MovieGrid
            movies={filteredAndSortedMovies}
            title={getMovieGridTitle()}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;