import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  useCdn: false
})

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
      "categories": categories[]->title
    }`,
    {},
    {
      cache: 'no-store' 
    }
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
      "categories": categories[]->title
    }`,
    { slug },
    {
      cache: 'no-store' 
    }
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
      "categories": categories[]->title
    }`,
    {params :{ query: `*${query}*` }},
    {
      cache: 'no-store' 
    }
  )
}