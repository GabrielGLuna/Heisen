"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, ThumbsUp } from "lucide-react"

type PreviewProps = {
  open: boolean
  anchorRect?: DOMRect | null
  onClose?: () => void
  item: {
    id: string
    title: string
    year: number
    rating: string
    duration?: string
    tags?: string[]
    description: string
    image: string
  }
}

export function HoverPreviewCard({ open, anchorRect, onClose, item }: PreviewProps) {
  if (!anchorRect) return null

  // Cálculo de posición básica: aparece encima y centrado respecto al póster.
  const width = 520
  const height = 280
  const gap = 12
  const left = Math.max(16, anchorRect.left + anchorRect.width / 2 - width / 2)
  const top = Math.max(80, anchorRect.top - height - gap)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed z-50"
          style={{ left, top, width }}
          onMouseLeave={onClose}
        >
          <div className="overflow-hidden rounded-xl bg-neutral-900 shadow-2xl ring-1 ring-white/10">
            <div className="relative h-40 w-full">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={`Portada de ${item.title}`}
                fill
                className="object-cover"
                sizes="520px"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base md:text-lg font-semibold text-white">{item.title}</h3>
                <div className="flex gap-2">
                  <Button size="icon" className="h-8 w-8 rounded-full bg-white text-black hover:bg-white/90">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-white/60">
                <span className="font-medium text-white/70">{item.year}</span>
                <span>•</span>
                <span className="rounded border border-white/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                  {item.rating}
                </span>
                {item.duration && (
                  <>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </>
                )}
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-white/80">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(item.tags ?? []).slice(0, 4).map((t) => (
                  <Badge key={t} variant="secondary" className="bg-white/10 text-white">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

