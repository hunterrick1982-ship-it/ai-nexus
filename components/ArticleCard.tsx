import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { Heart, MessageCircle } from 'lucide-react'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    coverImage: string | null
    createdAt: Date
    category?: { name: string; slug: string } | null
    author: { name: string | null; image: string | null }
    _count?: { favorites: number; comments: number }
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <article className="group overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg">
        {article.coverImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-4">
          {article.category && (
            <span className="inline-block rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
              {article.category.name}
            </span>
          )}
          <h3 className="mt-2 text-lg font-semibold line-clamp-2 group-hover:text-primary-500">
            {article.title}
          </h3>
          {article.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {article.excerpt}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              {article.author.image && (
                <img 
                  src={article.author.image} 
                  alt="" 
                  className="h-6 w-6 rounded-full"
                />
              )}
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                {article._count?.favorites || 0}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {article._count?.comments || 0}
              </span>
              <time>{format(new Date(article.createdAt), 'MM月dd日', { locale: zhCN })}</time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
