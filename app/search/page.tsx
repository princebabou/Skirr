import PostList from '@/components/PostList'

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const query = searchParams.q
  
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Search Results for &quot;{query}&quot;</h1>
      <PostList />
    </div>
  )
}