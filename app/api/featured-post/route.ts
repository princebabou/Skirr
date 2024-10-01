import { NextResponse } from 'next/server'
import { getPosts } from '@/sanity/lib/sanity.utils'

export async function GET() {
  try {
    const posts = await getPosts(1, 1)
    const featuredPost = posts[0]
    return NextResponse.json(featuredPost)
  } catch (error) {
    console.error('Error fetching featured post:', error)
    return NextResponse.json({ error: 'Failed to fetch featured post' }, { status: 500 })
  }
}