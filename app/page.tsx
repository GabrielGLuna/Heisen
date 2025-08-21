"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "components/ui/navbar"
import { MovieCard } from "components/ui/movie-card"
import { MoviePlayer } from "components/ui/movie-player"
import { CategoryFilter } from "components/ui/category-filter"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Film, Sparkles, TrendingUp, Calendar } from "lucide-react"
import config from "@/lib/config"

interface Movie {
  imdb_Id: string
  title: string
  year?: string
  poster?: string
  genre?: string
  rating?: number
  description?: string
}

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [recentMovies, setRecentMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [recentLoading, setRecentLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [playerOpen, setPlayerOpen] = useState(false)
  const [currentQuery, setCurrentQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Todas")
  const [showRecentMovies, setShowRecentMovies] = useState(false)

  const categories = ["Todas", "Acción", "Drama", "Comedia", "Terror", "Ciencia Ficción", "Romance"]

  // useEffect(() => {
  //   loadRecentMovies()
  // }, [])

  const loadRecentMovies = async () => {
    setRecentLoading(true)
    try {
      const response = await fetch(`${config.BACKEND_URL_BASE}api/search/?q=movie`)
      if (response.ok) {
        const data: Movie[] = await response.json()
        setRecentMovies(data.slice(0, 12))
        setShowRecentMovies(true)
      } else {
        console.log("[v0] API response not ok:", response.status)
      }
    } catch (err) {
      console.log("[v0] Error loading recent movies:", err)
    } finally {
      setRecentLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setMovies([])
      setCurrentQuery("")
      return
    }

    setLoading(true)
    setError(null)
    setCurrentQuery(query)

    try {
      const response = await fetch(`${config.BACKEND_URL_BASE}api/search/?q=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error("Failed to fetch movies")
      }

      const data: Movie[] = await response.json()
      setMovies(data)
    } catch (err) {
      setError("Unable to search movies. Please try again.")
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie)
    setPlayerOpen(true)
  }

  const handleClosePlayer = () => {
    setPlayerOpen(false)
    setSelectedMovie(null)
  }

  const filteredRecentMovies =
    activeCategory === "Todas" ? recentMovies : recentMovies.filter((movie) => movie.genre?.includes(activeCategory))

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onSearch={handleSearch}
        searchExpanded={searchExpanded}
        onToggleSearch={() => setSearchExpanded(!searchExpanded)}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        {!currentQuery && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center py-20"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-5xl md:text-7xl font-bold text-gradient mb-6 font-display">Stream Differently</h2>
              <p className="text-xl text-heisen-300 max-w-2xl mx-auto leading-relaxed">
                Experience the streaming platform that finally understands what you want. Instant previews, smart
                search, and seamless playback.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              <Button
                size="lg"
                onClick={() => setSearchExpanded(true)}
                className="bg-heisen-600 hover:bg-heisen-500 text-white px-8 py-3 text-lg"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Start Exploring
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={loadRecentMovies}
                disabled={recentLoading}
                className="border-heisen-600 text-heisen-300 hover:bg-heisen-800 px-8 py-3 text-lg bg-transparent"
              >
                {recentLoading ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <TrendingUp className="h-5 w-5 mr-2" />
                )}
                {recentLoading ? "Loading..." : "Browse Movies"}
              </Button>
            </motion.div>
          </motion.section>
        )}

        {!currentQuery && showRecentMovies && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-heisen-500" />
                <h2 className="text-2xl font-bold text-heisen-100">Películas Disponibles</h2>
              </div>
            </div>

            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {recentLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-heisen-500" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {filteredRecentMovies.map((movie, index) => (
                  <MovieCard key={movie.imdb_Id} movie={movie} index={index} onPlay={handlePlayMovie} />
                ))}
              </div>
            )}
          </motion.section>
        )}

        {/* Search Results */}
        {currentQuery && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-heisen-100 mb-2">Search Results for "{currentQuery}"</h2>
              <p className="text-heisen-400">{loading ? "Searching..." : `${movies.length} results found`}</p>
            </div>

            {loading && (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-heisen-500" />
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="mb-8">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {!loading && !error && movies.length === 0 && currentQuery && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-heisen-400 mb-4">
                  <Film className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No movies found for "{currentQuery}"</p>
                  <p className="text-sm">Try searching for something else</p>
                </div>
              </motion.div>
            )}

            {!loading && movies.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {movies.map((movie, index) => (
                  <MovieCard key={movie.imdb_Id} movie={movie} index={index} onPlay={handlePlayMovie} />
                ))}
              </div>
            )}
          </motion.section>
        )}
      </main>

      {/* Movie Player Modal */}
      <MoviePlayer movie={selectedMovie} isOpen={playerOpen} onClose={handleClosePlayer} />
    </div>
  )
}
