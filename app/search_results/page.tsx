"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { use, useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { m } from "framer-motion";
import { AlertCircleIcon } from "lucide-react";

interface Movie {
  imdb_Id: string;  
  title: string;
}

export default function search_results(){

const searchParams = useSearchParams();
const movie_to_search = searchParams.get('q')
const [movies_result, setMovies_result]=useState<Movie[]>([]);

useEffect(() => {
       
    fetch(`http://localhost:8000/api/search/?q=${movie_to_search}`)
    .then(response => response.json())
    .then((data:Movie[]) => {
      console.log(data),
      setMovies_result(data)
    })
    .catch(error => console.log(error))        
}, [])

return(
  <div className="flex justify-center flex-row">
    {movies_result.length !== 0 ? (<Carousel className="w-[40%]">
      <CarouselContent>
        {movies_result.map((movie) => (
        <CarouselItem key={movie.imdb_Id}>
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                <span className="text-4xl font-semibold">{movie.title}</span>
                <iframe src={`https://www.2embed.cc/embed/${movie.imdb_Id}`} width="100%" height="100%"></iframe>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      ))}
      </CarouselContent> 
      <CarouselPrevious />
      <CarouselNext />     
    </Carousel>  ):(
        <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          <p>Please verify your billing information and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Check your card details</li>
            <li>Ensure sufficient funds</li>
            <li>Verify billing address</li>
          </ul>
        </AlertDescription>
      </Alert>
    )}

          
  </div>
)
}