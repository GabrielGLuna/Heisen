"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Info, Plus, Check, Star } from "lucide-react"
import { motion } from "framer-motion"
import config from "@/lib/config"

interface Movie {
  imdb_Id: string
  title: string
  year?: string
  poster?: string
  genre?: string
  rating?: number | string
  description?: string
  backdrop?: string
}

interface MovieCardProps {
  movie: Movie
  index: number
  onPlay: (movie: Movie) => void
  onAddToList?: (movie: Movie) => void
  isInList?: boolean
}

export function MovieCard({ movie, index, onPlay, onAddToList, isInList = false }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [enhancedMovie, setEnhancedMovie] = useState<Movie>(movie)
  const [isLoadingDetails, setIsLoadingDetails] = useState(false)

  useEffect(() => {
    if (isHovered && !enhancedMovie.poster && !isLoadingDetails) {
      setIsLoadingDetails(true)
      fetch(
        `${config.BACKEND_URL_BASE}api/movie-details/?title=${encodeURIComponent(movie.title)}&imdb_id=${movie.imdb_Id}`,
      )
        .then((response) => response.json())
        .then((data: Movie) => {
          setEnhancedMovie((prev) => ({
            ...prev,
            poster: data.poster || prev.poster,
            description: data.description || prev.description,
            year: data.year || prev.year,
            rating: data.rating || prev.rating,
            backdrop: data.backdrop || prev.backdrop,
          }))
        })
        .catch((error) => {
          console.log("Error loading movie details:", error)
        })
        .finally(() => {
          setIsLoadingDetails(false)
        })
    }
  }, [isHovered, movie.title, movie.imdb_Id, enhancedMovie.poster, isLoadingDetails])

  const getPosterUrl = () => {
    return (
      enhancedMovie.poster ||
      `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(movie.title + " movie poster")}`
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="movie-card-hover bg-heisen-900/50 border-heisen-800 overflow-hidden">
        <CardContent className="p-0 relative aspect-[2/3]">
          {/* Movie Poster */}
          <div className="relative w-full h-full bg-gradient-to-br from-heisen-800 to-heisen-900">
            <img
              src={getPosterUrl() || "/placeholder.svg"}
              alt={enhancedMovie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-heisen-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Rating Badge */}
            {enhancedMovie.rating && (
              <div className="absolute top-3 right-3 bg-heisen-600/90 backdrop-blur-sm text-heisen-100 px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                <Star className="h-3 w-3 fill-current" />
                {enhancedMovie.rating}
              </div>
            )}

            {isLoadingDetails && (
              <div className="absolute top-3 left-3 bg-heisen-600/90 backdrop-blur-sm text-heisen-100 px-2 py-1 rounded-md text-xs">
                Cargando...
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-t from-heisen-950/95 via-heisen-950/60 to-transparent flex flex-col justify-end p-4"
          >
            <div className="space-y-3">
              <div className="space-y-2">
                <h3 className="font-bold text-heisen-100 text-lg leading-tight line-clamp-2">{enhancedMovie.title}</h3>

                <div className="flex items-center gap-3 text-sm">
                  {enhancedMovie.year && <span className="text-heisen-300 font-medium">{enhancedMovie.year}</span>}
                  {enhancedMovie.genre && (
                    <span className="text-heisen-400 bg-heisen-800/50 px-2 py-1 rounded-full text-xs">
                      {enhancedMovie.genre}
                    </span>
                  )}
                </div>

                {enhancedMovie.description && (
                  <p className="text-heisen-300 text-sm line-clamp-3 leading-relaxed">{enhancedMovie.description}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onPlay(enhancedMovie)}
                  className="bg-heisen-600 hover:bg-heisen-500 text-white flex-1 font-medium"
                >
                  <Play className="h-3 w-3 mr-1 fill-current" />
                  Reproducir
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-heisen-600 text-heisen-300 hover:bg-heisen-800 bg-transparent"
                >
                  <Info className="h-3 w-3" />
                </Button>

                {onAddToList && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAddToList(movie)}
                    className="border-heisen-600 text-heisen-300 hover:bg-heisen-800 bg-transparent"
                  >
                    {isInList ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
