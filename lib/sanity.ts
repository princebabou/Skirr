import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2021-03-25',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export async function getPosts(page = 1, limit = 10) {
  const start = (page - 1) * limit
  const end = start + limit

  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [${start}...${end}] {
      _id,
      title,
      slug,
      mainImage,
      excerpt
    }`
  )
}

export async function getPost(slug: string) {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      mainImage,
      content
    }`,
    { slug }
  )
}

export async function searchPosts(query: string) {
  return client.fetch(
    `*[_type == "post" && (title match $query || content match $query)] {
      _id,
      title,
      slug,
      mainImage,
      excerpt
    }`,
    { query }
  )
}