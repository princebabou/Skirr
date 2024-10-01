'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { PostSkeleton } from './PostSkeleton'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage: any
  excerpt: string
  publishedAt: string
  readingTime: string
  categories: string[]
}

export default function FeaturedPost() {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedPost() {
      try {
        const response = await fetch('/api/featured-post')
        const data = await response.json()
        setPost(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching featured post:', error)
        setLoading(false)
      }
    }

    fetchFeaturedPost()
  }, [])

  if (loading) {
    return <PostSkeleton />
  }

  if (!post) {
    return null
  }

  return (
    <Link href={`/posts/${post.slug.current}`} className="group">
      <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            {post.mainImage && (
              <div className="relative h-96 md:h-full md:w-96">
                <Image
                  src={urlForImage(post.mainImage).url()}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
          </div>
          <div className="p-8 md:flex-1 flex flex-col justify-between">
            <div>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((category) => (
                    <span key={category} className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full dark:text-blue-200 dark:bg-blue-900">
                      {category}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">{post.excerpt}</p>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}