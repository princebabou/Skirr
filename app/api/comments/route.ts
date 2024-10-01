import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get('postId')

  if (!postId) {
    return NextResponse.json({ error: 'Post ID is required' }, { status: 400 })
  }

  try {
    const comments = await client.fetch(
      `*[_type == "comment" && post._ref == $postId] | order(_createdAt desc) {
        _id,
        content,
        author,
        _createdAt
      }`,
      { postId }
    )
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { postId, content, author } = await request.json()

    if (!postId || !content) {
      return NextResponse.json({ error: 'Post ID and content are required' }, { status: 400 })
    }

    const comment = await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _ref: postId,
      },
      content,
      author: author || 'Anonymous',
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Error creating comment:', error)
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
  }
}