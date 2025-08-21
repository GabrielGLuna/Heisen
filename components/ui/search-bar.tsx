"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface SearchBarProps {
  onSearch: (query: string) => void
  isExpanded: boolean
  onToggle: () => void
}

export function SearchBar({ onSearch, isExpanded, onToggle }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery("")
    onSearch("")
  }

  return (
    <div className="relative">
      <AnimatePresence>
        {!isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-heisen-300 hover:text-heisen-100 hover:bg-heisen-800/50"
            >
              <Search className="h-5 w-5" />
            </Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "320px" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onSubmit={handleSubmit}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-heisen-400" />
              <Input
                type="text"
                placeholder="Search movies, series, actors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-10 bg-heisen-900/50 border-heisen-700 focus:border-heisen-500 text-heisen-100 placeholder:text-heisen-400"
                autoFocus
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-heisen-400 hover:text-heisen-200"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="text-heisen-400 hover:text-heisen-200"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
