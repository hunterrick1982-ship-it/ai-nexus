'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { ArticleCard } from '@/components/ArticleCard'

export default function ProfilePage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        {session.user?.image && (
          <img 
            src={session.user.image} 
            alt="" 
            className="h-20 w-20 rounded-full"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{session.user?.name}</h1>
          <p className="text-muted-foreground">{session.user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm text-muted-foreground">收藏文章</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm text-muted-foreground">发布文章</div>
        </div>
        <div className="rounded-lg border bg-card p-4 text-center">
          <div className="text-2xl font-bold">0</div>
          <div className="text-sm text-muted-foreground">评论</div>
        </div>
      </div>

      {/* Favorites */}
      <section>
        <h2 className="text-xl font-semibold mb-4">我的收藏</h2>
        <p className="text-muted-foreground">暂无收藏</p>
      </section>
    </div>
  )
}
