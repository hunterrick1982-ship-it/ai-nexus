import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { articleId } = await request.json()

  // Check if already favorited
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_articleId: {
        userId: session.user.id,
        articleId,
      },
    },
  })

  if (existing) {
    // Remove favorite
    await prisma.favorite.delete({
      where: { id: existing.id },
    })
    return NextResponse.json({ favorited: false })
  } else {
    // Add favorite
    await prisma.favorite.create({
      data: {
        userId: session.user.id,
        articleId,
      },
    })
    return NextResponse.json({ favorited: true })
  }
}
