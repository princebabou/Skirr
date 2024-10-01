import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

export const portableTextComponents = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <Image
          alt={value.alt || ' '}
          src={urlForImage(value).url()}
          width={800}
          height={400}
          className="w-full h-auto object-cover rounded-lg"
        />
      )
    },
  },
}