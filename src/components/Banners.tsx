import { BannerCarousel } from './BannerCarrousel'

//TODO?: Another API Call to get the banners, not needed for Demo.

export interface banner {
  title: string
  imageUrl: string
  linkedUrl: string
}

export function Banners() {
  return (
    <section className="w-full max-w-[1240px] p-2 grid-flow-col grid-cols-3 gap-8 my-2 bg-zinc-800">
      <BannerCarousel />
    </section>
  )
}
