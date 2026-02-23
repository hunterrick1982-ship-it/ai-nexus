import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
  _count: { articles: number }
}

interface CategoryFilterProps {
  categories: Category[]
  activeCategory?: string
}

export function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          !activeCategory
            ? 'bg-primary-500 text-white'
            : 'bg-muted hover:bg-muted/80'
        }`}
      >
        全部
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/?category=${category.slug}`}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === category.slug
              ? 'bg-primary-500 text-white'
              : 'bg-muted hover:bg-muted/80'
          }`}
        >
          {category.name} ({category._count.articles})
        </Link>
      ))}
    </div>
  )
}
