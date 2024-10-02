import Link from 'next/link'
import { getPosts } from '@/sanity/lib/sanity.utils'
import PostList from '@/components/PostList'
import { ArrowLeft, BookOpen } from 'lucide-react'

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const posts = await getPosts(1, 100) // Fetch up to 100 posts
  const categoryTitle = params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const categoryPosts = posts.filter((post: { categories: string | string[] }) => post.categories?.includes(categoryTitle))

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/categories"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Link>
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{categoryTitle}</span>
        </h1>
        <div className="flex items-center justify-center mb-12">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-2" />
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {categoryPosts.length} {categoryPosts.length === 1 ? 'post' : 'posts'} in this category
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12">
          <PostList />
        </div>
      </div>
    </div>
  )
}