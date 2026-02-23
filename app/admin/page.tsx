import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/login')
  }

  // Check if admin
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (user?.role !== 'ADMIN') {
    redirect('/')
  }

  const [articleCount, userCount, categoryCount] = await Promise.all([
    prisma.article.count(),
    prisma.user.count(),
    prisma.category.count(),
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">管理后台</h1>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <div className="text-3xl font-bold">{articleCount}</div>
          <div className="text-sm text-muted-foreground">文章总数</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-3xl font-bold">{userCount}</div>
          <div className="text-sm text-muted-foreground">用户总数</div>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <div className="text-3xl font-bold">{categoryCount}</div>
          <div className="text-sm text-muted-foreground">分类总数</div>
        </div>
      </div>
    </div>
  )
}
