import { tv } from 'tailwind-variants'

interface SerializationTagProps {
  Publishing_status: 'one-shot' | 'série' | 'issue' | ''
}

export function SerializationTag({ Publishing_status }: SerializationTagProps) {
  const PubTag = tv({
    base: 'text-xs absolute top-0 left-0 z-10 rounded-lg text-zinc-50 leading-tight px-1',
    variants: {
      color: {
        'one-shot': 'bg-orange-700/90 capitalize',
        série: 'bg-orange-500',
        issue: 'bg-purple-500 capitalize',
        '': 'bg-transparent text-transparent',
      },
    },
  })

  // Map the Publishing_status to the corresponding variant
  const variantColor = PubTag({ color: Publishing_status })

  return (
    <span className={variantColor}>{Publishing_status || 'Loading...'}</span>
  )
}
