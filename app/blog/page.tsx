import { getPosts } from '@/sanity/lib/sanity.utils'
import PostList from '@/components/PostList'
import SearchBar from '@/components/SearchBar'
import FeaturedPost from '@/components/FeaturedPost'

export const revalidate = 0

export default async function BlogHomePage() {
  const posts = await getPosts(1, 10) 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
          Skirr <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Blog</span>
        </h1>
      </header>

      <SearchBar />

      <main className="mt-16 space-y-20">
        {posts.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Post</h2>
            <FeaturedPost {...posts[0]} />
          </section>
        )}

        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Latest Posts</h2>
          <PostList />
        </section>
      </main>
    </div>
  )
}