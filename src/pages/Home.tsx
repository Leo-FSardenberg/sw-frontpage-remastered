import { Header } from '../components/Header'
import { Ranking } from '../components/Ranking'
import Alice from '@/assets/msc/Alice.png'
import SWLogo from '@/assets/msc/SWLogo.png'
import { Banners } from '../components/Banners'
import { MangaCarrousel } from '../components/MangaCaroussel'
import { Separator } from '@radix-ui/react-separator'

export function Home() {
  return (
    <div className="bg-zinc-950 flex flex-col justify-center items-center min-h-screen">
      <Header />
      <div className="bg-white mb-3 mx-6 flex justify-between w-full max-w-[1240px] h-28">
        <img
          className="h-full w-auto  object-contain mr-8"
          src={SWLogo}
          alt="Shonen west banner"
        />
        {/*TODO:Pra fazer trocar de imagem é a mesma lógica do banner carrousel,
         mas ia ter que fazer mais um endpoint com as capas e por um transition-opacity junto do autoplay*/}
        <img
          className="h-full w-auto object-contain"
          src={Alice}
          alt="banner"
        />
      </div>
      <Banners />
      <div className="flex justify-between w-full max-w-[1240px]">
        <div className="flex flex-col gap-6">
          <strong className="text-zinc-50 mx-2">NEW THIS MONTH</strong>
          <div className="flex flex-col gap-4">
            <MangaCarrousel UploadType={'This Month'} />
            <Separator
              orientation="horizontal"
              className="h-px my-4 bg-zinc-800"
            />
          </div>
          <div className="mt-2">
            <strong className="text-zinc-50 mx-2">LATEST CHAPTERS</strong>
            <MangaCarrousel UploadType={'Latest Chapters'} />
          </div>
        </div>
        <Ranking />
      </div>
    </div>
  )
}
