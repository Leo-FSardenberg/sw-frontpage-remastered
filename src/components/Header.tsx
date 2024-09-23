import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Bell, ChevronDown, Search } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { MangaContext } from '@/contexts/MangaContext'
import { type SetStateAction, useContext, useMemo, useState } from 'react'
import { MangaCard } from './MangaCard'
import { NavLink } from 'react-router-dom'

export function Header() {
  const { manga, loadManga } = useContext(MangaContext)
  const [searchQuery, setSearchQuery] = useState('')

  const navigate = useNavigate()

  const Latest = useMemo(() => {
    return manga.sort((a, b) => {
      {
        const aTime = parseDate(a.created_at)?.getTime() || 0
        const bTime = parseDate(b.created_at)?.getTime() || 0
        return bTime - aTime
      }
    })
  }, [manga])
  const Latestissues = useMemo(() => {
    return manga
      .filter(issue => issue.Publishing_status === 'issue') // Filter for issues
      .sort((a, b) => {
        const aTime = parseDate(a.created_at)?.getTime() || 0 // Parse and get time for issue a
        const bTime = parseDate(b.created_at)?.getTime() || 0 // Parse and get time for issue b
        return bTime - aTime // Sort in descending order
      })
  }, [manga])
  console.log('Manga Data:', manga)
  if (manga.length === 0) {
    return <div>Loading...</div>
  }
  function parseDate(dateString: string | number | Date) {
    return new Date(dateString)
  }

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setSearchQuery(event.target.value)
  }
  const handleSearchKeyDown = async (event: { key: string }) => {
    if (event.key === 'Enter') {
      await loadManga(searchQuery)

      const foundManga = manga.find(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

      if (foundManga) {
        navigate(`/manga/${foundManga.id}`)
      } else {
        console.log('Manga not found')
      }
    }
  }

  return (
    <header className="bg-black w-full max-w-[1240px]">
      <div className="flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center ml-auto gap-8 mr-4">
          <HoverCard>
            <HoverCardTrigger className="text-orange-400">
              ISSUES
            </HoverCardTrigger>

            <HoverCardContent className="bg-orange-600 fixed inset-0 rounded-lg flex-col justify-center items-center gap-3 h-[330px] min-w-[550px] p-5 overflow-hidden">
              <div className="flex items-center justify-center gap-4 mb-3">
                <Button className="bg-orange-600 ring-1 ring-yellow-400 text-zinc-50 min-w-28 flex-1 rounded-none">
                  Previous Issue
                </Button>
                <Button className="bg-orange-600 ring-1 ring-yellow-400 text-zinc-50 min-w-40 flex-auto rounded-none">
                  Releases
                </Button>
              </div>
              <div className="flex items-center">
                {Latestissues.slice(0, 2).map((issue, index) => {
                  return index === 0 ? (
                    <img
                      key={issue.id}
                      src={issue.imageUrl}
                      className="max-h-[220px] mx-auto"
                      alt={issue.name}
                    />
                  ) : (
                    <img
                      key={issue.id}
                      src={issue.imageUrl}
                      className="max-h-[250px] w-[210px] mx-auto"
                      alt={issue.name}
                    />
                  )
                })}
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger className="text-orange-400">
              MANGA
            </HoverCardTrigger>
            <HoverCardContent className="bg-orange-600 fixed inset-0 rounded-lg flex-col justify-center items-center gap-3 h-[330px] min-w-[550px] p-5 overflow-hidden">
              <div className="flex items-center justify-evenly mb-3">
                <NavLink
                  to="/releases"
                  className="bg-orange-600 text-zinc-50 flex-1 rounded-none mx-2 ring-1 ring-indigo-600 text-center py-2"
                >
                  Releases
                </NavLink>
                <NavLink
                  to="/manga"
                  className="bg-orange-600 text-zinc-50 flex-1 rounded-none mx-2 ring-1 ring-yellow-300 text-center py-2"
                >
                  All Manga
                </NavLink>
              </div>
              <div className="flex gap-3 max-w-full overflow-x-auto">
                {Latest.slice(0, 3).map(latestManga => {
                  return (
                    <NavLink
                      key={latestManga.id}
                      to={`/manga/${latestManga.id}`}
                    >
                      <div className="rounded-lg bg-zinc-50 flex flex-col gap-2 p-2">
                        <MangaCard
                          name={latestManga.name}
                          imageUrl={latestManga.imageUrl}
                          Publishing_status={latestManga.Publishing_status}
                          isHeaderSlot={true}
                        />
                        <div className="text-orange-600 text-center font-semibold">
                          {latestManga.name}
                        </div>
                      </div>
                    </NavLink>
                  )
                })}
              </div>
            </HoverCardContent>
          </HoverCard>
          <NavLink to="/tbd" className="text-orange-400 bg-black text-xs p-0">
            NEWSLETTER
          </NavLink>
          <Button className="text-zinc-400 bg-black text-xs p-0">STORE</Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-orange-400 outline-none ">
              <div className="flex gap-1 items-center justify-between">
                CONTACT US
                <ChevronDown className=" size-3 text-orange-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-zinc-100 bg-orange-600 rounded-md ring-none data-[state=open]:ring-1 data-[state=open]:ring-yellow-400">
              <DropdownMenuItem className="focus:ring-yellow-500 focus:ring-1">
                <NavLink to="/tbd">Show us your work</NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white" />
              <DropdownMenuItem className="focus:ring-yellow-500 focus:ring-1">
                <NavLink to="/tbd">Speak to us</NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white" />
              <DropdownMenuItem className="focus:ring-yellow-500 focus:ring-1">
                <NavLink to="/tbd">Support channel</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-orange-400 outline-none flex-shrink">
              <div className="flex gap-1 items-center justify-between">
                ABOUT US
                <ChevronDown className=" size-3 text-orange-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-zinc-100 border-none  bg-orange-600 rounded-m data-[state=open]:ring-1 data-[state=open]:ring-yellow-400">
              <DropdownMenuItem className="rounded-md focus:ring-1 focus:ring-yellow-400">
                <NavLink to="/tbd">How the ranking works</NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white" />
              <DropdownMenuItem className="rounded-md focus:ring-1 focus:ring-yellow-400">
                <NavLink to="/tbd">About the platform</NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white h-px" />
              <DropdownMenuItem className="rounded-md focus:ring-1 focus:ring-yellow-400">
                <NavLink to="/tbd">Our history</NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white" />
              <DropdownMenuItem className="rounded-md focus:ring-1 focus:ring-yellow-400">
                <NavLink to="/tbd">Help/FAQs</NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button className="text-orange-400/90 leading-tight max-w-[110px] text-xs border ml-4 mr-6 h-6 border-orange-400 bg-zinc-950 hover:border-bg-yellow-300 hover:text-white">
          <NavLink to="/tbd">SUBSCRIBE NOW</NavLink>
          {/*Iria para uma pag Billing, mas eu fiquei com preguiça de fazer, talvez em outro commit*/}
        </Button>

        <div className="flex gap-3 justify-center mr-12">
          <input
            className="leading-tight truncate rounded-sm text-orange-400 hover:border-orange-400 pl-1 placeholder:text-zinc-600 bg-zinc-800 mt-1 h-6 items-start placeholder:text-xs border-2 border-zinc-700"
            placeholder="Find your favourite manga!"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleSearchKeyDown}
          />

          <Search className="text-orange-400 mb-0.5 size-6 mt-2" />
          <Bell className="text-orange-400 size-6 mt-2 fill-orange-400" />

          <Avatar className="size-7 my-0.5">
            <AvatarImage src="https://th.bing.com/th?id=OIP.aXs4AHAEvx-CjaU6682qXwAAAA&w=150&h=150&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.4&pid=3.1&rm=2" />
          </Avatar>
          {/*No Design to Chuuni o avatar não link pra home, mas seria fácil de fazer. Assim como usar layouts para preservar o Header em todas págs*/}
        </div>
      </div>
    </header>
  )
}
