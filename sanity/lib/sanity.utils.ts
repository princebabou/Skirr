import { client } from './client'

export async function getPosts(page = 1, limit = 10) {
  const start = (page - 1) * limit
  const end = start + limit

  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [${start}...${end}] {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      readingTime,
      "categories": categories[]->title
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
      body,
      publishedAt,
      readingTime,
      "categories": categories[]->title
    }`,
    { slug }
  )
}

export async function searchPosts(query: string) {
  return client.fetch(
    `*[_type == "post" && (title match $query || pt::text(body) match $query)] {
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      publishedAt,
      readingTime
    }`,
    { query: `*${query}*` }
  )
}