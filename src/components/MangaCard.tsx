import { useState } from 'react'
import { SerializationTag } from './serialization-tag'
import { Card, CardContent } from './ui/card'
import { tv } from 'tailwind-variants'

interface MangaCardProps {
  name: string
  imageUrl: string
  Publishing_status: 'série' | 'one-shot' | 'issue' | ''
  isHeaderSlot: boolean
}

export function MangaCard({
  imageUrl,
  Publishing_status,
  name,
  isHeaderSlot,
}: MangaCardProps) {
  const [isSelected, setIsSelected] = useState(false)

  const handleCardClick = () => {
    setIsSelected(prev => !prev)
  }

  const cardVariants = tv({
    base: 'p-0 relative overflow-hidden focus:ring-1 focus:ring-yellow-400 focus:max-h-[200px]',
    variants: {
      slot: {
        header: 'rounded-lg',
        default: 'rounded-none',
      },
      imageSize: {
        header: 'max-h-[240px]',
        default: 'max-h-[180px]',
      },
    },
  })

  return (
    <Card
      onClick={handleCardClick}
      data-is-selected={isSelected}
      className={cardVariants({ slot: isHeaderSlot ? 'header' : 'default' })}
    >
      <CardContent className="mx-auto p-0 relative">
        <SerializationTag Publishing_status={Publishing_status} />
        <img
          className={`${cardVariants({ imageSize: isHeaderSlot ? 'header' : 'default' })} object-contain transition-all duration-300`}
          src={imageUrl}
          alt={name}
        />
        <span
          className="data-[is-selected=true]:font-bold 
        data-[is-selected=true]:text-yellow-400 mt-auto"
        >
          {name}
        </span>
      </CardContent>
    </Card>
  )
}
