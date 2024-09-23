import Autoplay from 'embla-carousel-autoplay'
import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import type { banner } from './Banners'
export function BannerCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [banner, setBanner] = useState<banner[]>([])

  useEffect(() => {
    fetch('http://localhost:3000/Banners').then(response => {
      response.json().then(data => {
        setBanner(data)
      })
    })
  }, [])
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[plugin.current]}
    >
      <CarouselContent className="flex">
        {banner.map(bannerItem => {
          return (
            <CarouselItem key={bannerItem.title} className="basis-1/3">
              <img src={bannerItem.imageUrl} alt={''} />
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
