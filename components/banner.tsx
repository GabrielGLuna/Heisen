"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Plus, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type HeroBannerProps = {
  helloWorld?:string
  title?: string
  synopsis?: string
  backgroundSrc?: string
  badges?: string[]
}

export function HeroBanner({
  title = "Todo en todas partes al mismo tiempo",
  synopsis = "Una heroína inesperada debe usar sus nuevos poderes para luchar contra los desconcertantes peligros del multiverso y así lograr salvar su mundo.",
  backgroundSrc = "/images/prime-hero.png",
  badges = ["Es cine 🚬", "18+"],
}: HeroBannerProps) {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[58vh] min-h-[460px] w-full">
        <Image
          src={backgroundSrc || "/placeholder.svg"}
          alt="Fondo de la película destacada"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-xl md:max-w-2xl">
            <div className="text-emerald-300 text-xs font-semibold tracking-wide">{"#1 en tendencias"}</div>
            <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight text-white">{title}</h1>
            <p className="mt-4 text-sm md:text-base text-white/80">{synopsis}</p>

            <div className="mt-3 flex gap-2 flex-wrap">
              {badges.map((b, i) => (
                <Badge key={i} variant="secondary" className="bg-white/10 text-white">
                  {b}
                </Badge>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button size="lg" className="h-12 rounded-full bg-white text-black hover:bg-white/90">
                <Play className="h-5 w-5 mr-2" />
                {"Empezar"}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <Plus className="h-5 w-5 mr-2" />
                {"Añadir a la lista"}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <Info className="h-5 w-5 mr-2" />
                {"Info"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
