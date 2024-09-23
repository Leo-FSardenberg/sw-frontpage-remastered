import { useContext } from 'react'
import Rankingimage from '../assets/msc/Titulo-Ranking-2-2-600x283.png'
import { Separator } from '@radix-ui/react-separator'
import { MangaContext } from '@/contexts/MangaContext'

export function Ranking() {
  const { manga } = useContext(MangaContext)

  const AscManga = manga
    .filter(manga => manga.Publishing_status !== 'issue')
    .sort((a, b) => b.score - a.score)
  return (
    <div className="bg-zinc-900 flex flex-col max-w-[320px] gap-4 h-full">
      <img className="object-fill" src={Rankingimage} alt={'Ranking'} />
      <div className="bg-white rounded-lg mx-2">
        <div className="flex flex-col m-1 max-h-[500px] ">
          {AscManga.slice(0, 5).map((mangaItem, index) => {
            return (
              <div
                key={mangaItem.id}
                className="flex gap-3 items-center justify-start pt-1"
              >
                <strong className="font-bold text-black ml-1">
                  {index + 1}
                </strong>
                <img
                  className="h-20 w-12 rounded-md"
                  src={mangaItem.imageUrl}
                  alt={mangaItem.name}
                />
                <div className="flex flex-col gap-2">
                  <strong className="text-zinc-950">{mangaItem.name}</strong>
                  <span className="text-zinc-700 font-semibold">
                    {mangaItem.score}
                  </span>
                </div>
                <Separator className="h-px bg-zinc-200 mt-1" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
