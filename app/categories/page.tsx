import Link from 'next/link'
import { getPosts } from '@/sanity/lib/sanity.utils'
import { TagIcon } from 'lucide-react'

type Category = {
  title: string
  slug: string
  postCount: number
}

export default async function CategoriesPage() {
  const posts = await getPosts(1, 100) // Fetch up to 100 posts
  const categoriesMap = posts.reduce((acc: Record<string, { postCount: number; title: string; slug: string }>, post: { categories: { title: string; slug: string }[] }) => {
    post.categories?.forEach((category) => {
      if (!acc[category.slug]) {
        acc[category.slug] = { postCount: 0, title: category.title, slug: category.slug }
      }
      acc[category.slug].postCount++
    })
    return acc
  }, {} as Record<string, { postCount: number; title: string; slug: string }>)

  const categories = Object.values(categoriesMap) as Category[];
  const sortedCategories = categories.sort((a, b) => b.postCount - a.postCount);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
          Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Categories</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCategories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/categories/${category.slug}`}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6 flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors duration-300">
                    <TagIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {category.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
                  </p>
                </div>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}