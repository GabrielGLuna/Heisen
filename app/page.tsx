"use client"
import { AppShell } from "@/components/sidebar"
import { HeroBanner } from "@/components/banner"
import { CarouselRow } from "@/components/carousel"
import { sampleMovies } from "@/lib/movies"

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <AppShell>
        <main className="flex flex-col">
          {}
          <HeroBanner />

          <div className="mt-6 space-y-8 pb-16">
            <CarouselRow title="Seguir Viendo" items={sampleMovies} />
            <CarouselRow title="Porque viste Chicuarotes" items={sampleMovies} />
            <CarouselRow title="Tendencias" items={sampleMovies} />
          </div>
        </main>
      </AppShell>

      <div className="hidden">
        <img src="/images/netflix-hover.png" alt="Referencia de preview Netflix" />
        <img src="/images/max-sidebar.png" alt="Referencia de sidebar Max" />
      </div>
    </div>
  )
}
