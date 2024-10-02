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

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts')
        const data = await response.json()
        setPosts(data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link key={post._id} href={`/posts/${post.slug.current}`} className="group">
          <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            {post.mainImage && (
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={urlForImage(post.mainImage).url()}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            )}
            <div className="p-6 relative">
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((category) => (
                    <span key={category} className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full dark:text-blue-200 dark:bg-blue-900">
                      {category}
                    </span>
                  ))}
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}