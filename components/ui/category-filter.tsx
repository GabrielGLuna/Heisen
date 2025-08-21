"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-2 mb-8"
    >
      {categories.map((category) => (
        <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={
              activeCategory === category
                ? "bg-heisen-600 hover:bg-heisen-500 text-white"
                : "border-heisen-600 text-heisen-300 hover:bg-heisen-800 bg-transparent"
            }
          >
            {category}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
