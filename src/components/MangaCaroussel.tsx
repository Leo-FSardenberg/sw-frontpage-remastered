import { MangaContext } from '@/contexts/MangaContext'
import { useContext } from 'react'
import { MangaCard } from './MangaCard'
import {
  Carousel,
  CarouselPrevious,
  CarouselNext,
  CarouselContent,
  CarouselItem,
} from './ui/carousel'

interface MangaCarousselProps {
  UploadType: 'This Month' | 'Latest Chapters'
}
export function MangaCarrousel({ UploadType }: MangaCarousselProps) {
  const { manga } = useContext(MangaContext)
  console.log('Manga Data:', manga)

  if (manga.length === 0) {
    return <div>Loading...</div>
  }
  function parseDate(dateString: string | number | Date) {
    return new Date(dateString)
  }
  const LatestChapters = manga
    .filter(manga => manga.Publishing_status === 'série') 
    .sort((a, b) => {
      const aTime = parseDate(a.created_at)?.getTime() || 0
      const bTime = parseDate(b.created_at)?.getTime() || 0
      return bTime - aTime 
    })

  return (
    <div>
      <Carousel
        opts={{ align: 'start' }}
        className="relative w-full bg-zinc-950"
      >
        <div className="absolute -top-5 right-10 z-10 flex">
          <CarouselPrevious className="text-yellow-500 text-lg size-8 disabled:bg-transparent disabled:text-transparent mx-0 bg-transparent focus:bg-zinc950 border-none ring-0" />
          <CarouselNext className="text-yellow-500 text-lg size-8 disabled:bg-transparent disabled:text-transparent mx-0 bg-transparent border-none ring-0" />
        </div>
        <CarouselContent className="-ml-1 h-[180px]">
          {UploadType === 'This Month'
            ? manga.map(mangaItem => (
                <CarouselItem key={mangaItem.id} className="pl-1.5 basis-1/8">
                  <MangaCard
                    name={mangaItem.name}
                    Publishing_status={mangaItem.Publishing_status}
                    imageUrl={mangaItem.imageUrl}
                    isHeaderSlot={false}
                  />
                </CarouselItem>
              ))
            : LatestChapters.map(mangaItem => (
                <CarouselItem key={mangaItem.id} className="pl-1.5 basis-1/8">
                  <MangaCard
                    name={mangaItem.name}
                    Publishing_status={mangaItem.Publishing_status}
                    imageUrl={mangaItem.imageUrl}
                    isHeaderSlot={false}
                  />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}


