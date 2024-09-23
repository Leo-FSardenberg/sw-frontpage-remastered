import { createContext, type ReactNode, useEffect, useState } from 'react'

interface manga {
  id: number
  name: string
  genere: string
  imageUrl: string
  chapters: number
  score: number
  Publishing_status: 'one-shot' | 'série' | 'issue'
  language: 'pt-br | eng | jap | chi | kor'
  created_at: Date
  updtated_at: Date
}

interface MangaContextType {
  manga: manga[]
  loadManga: (query?: string) => Promise<void>
}
interface mangaProviderProps {
  children: ReactNode
}
export const MangaContext = createContext({} as MangaContextType)

export function MangaProvider({ children }: mangaProviderProps) {
  const [manga, setManga] = useState<manga[]>([])

  async function loadManga(query?: string) {
    try {
      const url = new URL('http://localhost:3000/Manga')
      if (query) {
        url.searchParams.append('q', query)
      }
      const response = await fetch(url)
      if (!response.ok) throw new Error('Network response was not ok')

      const data = await response.json()
      setManga(data)
    } catch (error) {
      console.error('Failed to fetch manga:', error)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    loadManga()
  }, [])

  return (
    <MangaContext.Provider value={{ manga, loadManga }}>
      {children}
    </MangaContext.Provider>
  )
}
