"use client"

import Image from "next/image"
import React from "react"
import { HoverPreviewCard } from "./preview-card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export type MovieItem = {
  id: string
  title: string
  year: number
  rating: string
  duration?: string
  description: string
  tags?: string[]
  image: string
  poster: string
}

type CarouselRowProps = {
  title?: string
  items: MovieItem[]
}

export function CarouselRow({ title = "Popular on Stream", items }: CarouselRowProps) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null)
  const [hovered, setHovered] = React.useState<string | null>(null)
  const [rect, setRect] = React.useState<DOMRect | null>(null)

  const scrollByAmount = (dir: "left" | "right") => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.9) * (dir === "left" ? -1 : 1)
    el.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section className="relative">
      <div className="mb-3 px-4 md:px-8 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
        <div className="hidden md:flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => scrollByAmount("left")}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => scrollByAmount("right")}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div ref={scrollerRef} className="no-scrollbar relative flex gap-3 overflow-x-auto px-4 md:px-8 pb-2">
        {items.map((m) => (
          <div
            key={m.id}
            className="relative shrink-0"
            onMouseEnter={(e) => {
              setHovered(m.id)
              setRect((e.currentTarget as HTMLDivElement).getBoundingClientRect())
            }}
            onMouseLeave={() => {
              setHovered(null)
              setRect(null)
            }}
          >
            <div className="relative h-[150px] w-[260px] md:h-[170px] md:w-[300px] overflow-hidden rounded-md">
              <Image
                src={m.poster || "/placeholder.svg"}
                alt={`Poster de ${m.title}`}
                fill
                className="object-cover"
                sizes="300px"
              />
              <div className="absolute inset-0 ring-1 ring-white/10" />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        {items.map((m) => (
          <HoverPreviewCard
            key={m.id}
            open={hovered === m.id}
            anchorRect={rect}
            onClose={() => {
              setHovered(null)
              setRect(null)
            }}
            item={m}
          />
        ))}
      </div>
    </section>
  )
}
