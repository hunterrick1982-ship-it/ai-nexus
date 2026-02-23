import Link from 'next/link'
import { LayoutDashboard, FileText, Users, Tag } from 'lucide-react'

const adminNav = [
  { name: '概览', href: '/admin', icon: LayoutDashboard },
  { name: '文章', href: '/admin/articles', icon: FileText },
  { name: '分类', href: '/admin/categories', icon: Tag },
  { name: '用户', href: '/admin/users', icon: Users },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className="w-48 shrink-0">
        <nav className="space-y-1">
          {adminNav.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
