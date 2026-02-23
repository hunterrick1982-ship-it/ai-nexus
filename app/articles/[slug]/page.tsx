import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Heart, MessageCircle, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CommentSection } from '@/components/CommentSection'
import { FavoriteButton } from '@/components/FavoriteButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

async function getArticle(slug: string) {
  return prisma.article.findUnique({
    where: { slug, published: true },
    include: {
      author: { select: { id: true, name: true, image: true } },
      category: { select: { name: true, slug: true } },
      _count: { select: { favorites: true, comments: true } },
    },
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)
  
  if (!article) {
    notFound()
  }

  const session = await getServerSession(authOptions)

  return (
    <article className="mx-auto max-w-3xl">
      {/* Back Button */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        返回
      </Link>

      {/* Header */}
      <header className="mb-8">
        {article.category && (
          <Link 
            href={`/?category=${article.category.slug}`}
            className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300"
          >
            {article.category.name}
          </Link>
        )}
        
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          {article.title}
        </h1>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {article.author.image && (
              <img 
                src={article.author.image} 
                alt={article.author.name || ''} 
                className="h-10 w-10 rounded-full"
              />
            )}
            <div>
              <p className="font-medium">{article.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(article.createdAt), 'yyyy年MM月dd日', { locale: zhCN })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session && (
              <FavoriteButton 
                articleId={article.id} 
                initialCount={article._count.favorites} 
              />
            )}
            <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {article.coverImage && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {article.content}
      </div>

      {/* Comments */}
      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">
          评论 ({article._count.comments})
        </h2>
        <CommentSection articleId={article.id} />
      </section>
    </article>
  )
}
