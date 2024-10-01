import { NextResponse } from 'next/server'
import { getPosts } from '@/sanity/lib/sanity.utils'

export async function GET() {
  try {
    const posts = await getPosts(1, 10)
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}