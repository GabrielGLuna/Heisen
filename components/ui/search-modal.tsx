"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import config from "@/lib/config"

interface SearchResult {
  title: string
  imdb_Id: string
  year?: string
  poster?: string
  type?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
}

export function SearchModal({ isOpen, onClose, onSearch }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (!isOpen) {
          // This would be handled by parent component
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`${config.BACKEND_URL_BASE}api/search/?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()

      if (Array.isArray(data)) {
        setResults(data)
        // Add to recent searches
        const newRecent = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
        setRecentSearches(newRecent)
        localStorage.setItem("recentSearches", JSON.stringify(newRecent))
      }
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleRecentSearch = (recentQuery: string) => {
    setQuery(recentQuery)
    handleSearch(recentQuery)
  }

  const removeRecentSearch = (searchToRemove: string) => {
    const newRecent = recentSearches.filter((s) => s !== searchToRemove)
    setRecentSearches(newRecent)
    localStorage.setItem("recentSearches", JSON.stringify(newRecent))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-heisen-900/95 backdrop-blur-xl border border-heisen-700/50 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <form onSubmit={handleSubmit} className="p-6 border-b border-heisen-800/50">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-heisen-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movies and series..."
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-heisen-600 rounded-xl text-white placeholder-heisen-400 focus:border-heisen-500 focus:outline-none transition-colors text-lg"
                  autoFocus
                />
              </div>
            </form>

            {/* Content */}
            <div className="max-h-96 overflow-y-auto">
              {/* Recent Searches */}
              {!query && recentSearches.length > 0 && (
                <div className="p-6">
                  <h3 className="text-heisen-300 text-sm font-medium mb-4 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Recent
                  </h3>
                  <div className="space-y-2">
                    {recentSearches.map((recent, index) => (
                      <motion.div
                        key={recent}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-heisen-800/30 hover:bg-heisen-700/50 transition-colors cursor-pointer group"
                        onClick={() => handleRecentSearch(recent)}
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-heisen-400" />
                          <span className="text-white">{recent}</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-heisen-400 hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeRecentSearch(recent)
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {results.length > 0 && (
                <div className="p-6">
                  <h3 className="text-heisen-300 text-sm font-medium mb-4">Results</h3>
                  <div className="space-y-2">
                    {results.map((result, index) => (
                      <motion.div
                        key={result.imdb_Id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-heisen-800/30 hover:bg-heisen-700/50 transition-colors cursor-pointer group"
                        onClick={() => {
                          onSearch(result.title)
                          onClose()
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-heisen-700 rounded-lg flex items-center justify-center">
                            <span className="text-heisen-300 font-medium">{result.title.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{result.title}</div>
                            {result.year && <div className="text-heisen-400 text-sm">{result.year}</div>}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="p-6 text-center">
                  <div className="inline-flex items-center gap-2 text-heisen-400">
                    <div className="w-4 h-4 border-2 border-heisen-600 border-t-heisen-400 rounded-full animate-spin" />
                    Searching...
                  </div>
                </div>
              )}

              {/* Empty State */}
              {query && !isLoading && results.length === 0 && (
                <div className="p-6 text-center text-heisen-400">No results found for "{query}"</div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-heisen-800/50 bg-heisen-950/50">
              <div className="flex items-center justify-between text-xs text-heisen-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-heisen-800 rounded text-heisen-300">↵</kbd>
                    to select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-2 py-1 bg-heisen-800 rounded text-heisen-300">esc</kbd>
                    to close
                  </span>
                </div>
                <span>Search by StreamFlix</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
