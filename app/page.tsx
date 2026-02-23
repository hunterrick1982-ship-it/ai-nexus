import { prisma } from '@/lib/prisma'
import { ArticleCard } from '@/components/ArticleCard'
import { CategoryFilter } from '@/components/CategoryFilter'

export const dynamic = 'force-dynamic'

async function getArticles(search?: string, categorySlug?: string) {
  const where: any = { published: true }
  
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { content: { contains: search } },
    ]
  }
  
  if (categorySlug) {
    where.category = { slug: categorySlug }
  }

  return prisma.article.findMany({
    where,
    include: {
      author: { select: { name: true, image: true } },
      category: { select: { name: true, slug: true } },
      _count: { select: { favorites: true, comments: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
}

async function getCategories() {
  return prisma.category.findMany({
    include: { _count: { select: { articles: true } } },
  })
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>
}) {
  const params = await searchParams
  const articles = await getArticles(params.search, params.category)
  const categories = await getCategories()

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold md:text-5xl">
          AI <span className="text-primary-500">资讯中心</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          最新的 AI 新闻、工具和教程
        </p>
      </section>

      {/* Categories */}
      <CategoryFilter categories={categories} activeCategory={params.category} />

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          暂无文章
        </div>
      )}
    </div>
  )
}
