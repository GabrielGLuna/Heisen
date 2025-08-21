"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SearchModal } from "components/ui/search-modal"
import { Button } from "@/components/ui/button"
import { Film, Home, Play, Tv, User, Menu, X, Search } from "lucide-react"

interface NavbarProps {
  onSearch: (query: string) => void
}

export function Navbar({ onSearch }: NavbarProps) {
  const [activeItem, setActiveItem] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  const navItems = [
    { id: "home", label: "Inicio", icon: Home },
    { id: "movies", label: "Películas", icon: Play },
    { id: "series", label: "Series", icon: Tv },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-40 glass-effect border-b border-heisen-800/50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 gradient-heisen rounded-lg flex items-center justify-center">
                <Film className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient font-display">StreamFlix</h1>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:flex items-center gap-1 bg-heisen-900/50 backdrop-blur-sm rounded-full p-1"
            >
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeItem === item.id ? "text-white" : "text-heisen-300"
                    }`}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeItem === item.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-heisen-600 rounded-full shadow-lg shadow-heisen-600/30"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    {activeItem !== item.id && (
                      <motion.div
                        className="absolute inset-0 bg-heisen-700/30 rounded-full opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <Icon className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">{item.label}</span>
                  </motion.button>
                )
              })}
            </motion.nav>

            {/* Right Section */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <motion.button
                onClick={() => setSearchModalOpen(true)}
                className="p-2 text-heisen-300 hover:text-white transition-colors duration-200 hover:bg-heisen-800/50 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-heisen-600 text-heisen-300 hover:bg-heisen-800 hover:text-white hover:border-heisen-500 bg-transparent hidden sm:flex transition-all duration-300 hover:shadow-lg hover:shadow-heisen-600/20"
                >
                  <User className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </motion.div>

              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-heisen-300 hover:text-white transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: mobileMenuOpen ? "auto" : 0,
              opacity: mobileMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => {
                      setActiveItem(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeItem === item.id
                        ? "bg-heisen-600 text-white shadow-lg shadow-heisen-600/30"
                        : "text-heisen-300 hover:bg-heisen-800/50 hover:text-white"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                )
              })}

              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 mt-4 border-heisen-600 text-heisen-300 hover:bg-heisen-800 hover:text-white hover:border-heisen-500 bg-transparent transition-all duration-300"
                >
                  <User className="h-5 w-5" />
                  Iniciar Sesión
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} onSearch={onSearch} />
    </>
  )
}
