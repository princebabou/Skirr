import { getPost } from '@/sanity/lib/sanity.utils'
import { urlForImage } from '@/sanity/lib/image'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import CommentSection from '@/components/CommentSection'
import { portableTextComponents } from '@/components/PortableTextComponents'
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react'

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {post.mainImage && (
          <div className="relative h-[400px]">
            <Image
              src={urlForImage(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            {post.author && (
              <div className="flex items-center mr-4 mb-2">
                <UserIcon className="w-4 h-4 mr-2" />
                <span>{post.author.name}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center mr-4 mb-2">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
            )}
            {post.estimatedReadingTime && (
              <div className="flex items-center mb-2">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span>{post.estimatedReadingTime} min read</span>
              </div>
            )}
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        </div>
      </article>
      <div className="mt-12">
        <CommentSection postId={post._id} />
      </div>
    </div>
  )
}