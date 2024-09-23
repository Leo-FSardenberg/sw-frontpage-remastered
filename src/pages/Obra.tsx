import { MangaCard } from '@/components/MangaCard'
import { MangaContext } from '@/contexts/MangaContext'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'

export function Obra() {
  const { manga } = useContext(MangaContext)
  const { mangaId } = useParams()

  if (mangaId) {
    const selectedManga = manga.find(
      item => item.id === Number.parseInt(mangaId)
    )

    return (
      <div className="bg-zinc-950 flex flex-col justify-center items-start p-6 min-h-screen">
        <div className="text-zinc-50">
          Não vou refazer essa página pois não há outro design pelo Chuuni,
          seria só refazer oq já tá lá <br />
          Isso daqui só existe para demonstrar como seria a navegação por Id do
          mangá funcionando.
        </div>
        {selectedManga ? (
          <MangaCard
            name={selectedManga.name}
            Publishing_status={selectedManga.Publishing_status}
            imageUrl={selectedManga.imageUrl}
            isHeaderSlot={true}
          />
        ) : (
          <p>Manga not found</p>
        )}
      </div>
    )
  }
  return <p>Manga not found</p>
}
