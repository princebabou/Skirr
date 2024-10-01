import { getPosts } from '@/sanity/lib/sanity.utils'
import PostList from '@/components/PostList'
import SearchBar from '@/components/SearchBar'
import FeaturedPost from '@/components/FeaturedPost'

export default async function Home() {
  const posts = await getPosts(1, 10)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const featuredPost = posts[0] // Assuming the first post is the featured one

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Skirr</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore the latest insights, stories, and innovations in the digital world.
        </p>
      </header>

      <SearchBar />

      <main className="mt-16 space-y-20">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Post</h2>
          <FeaturedPost />
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Latest Posts</h2>
          <PostList />
        </section>
      </main>
    </div>
  )
}