'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Search, Menu, X, User, LogOut, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { SearchBar } from './SearchBar'

export function Navbar() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary-500" />
          <span className="text-xl font-bold">AI Nexus</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary-500">
            首页
          </Link>
          <Link href="/tools" className="text-sm font-medium hover:text-primary-500">
            工具库
          </Link>
          <SearchBar />
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <Link href="/profile" className="flex items-center gap-2">
                {session.user?.image ? (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || ''} 
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </Link>
              {session.user?.email === 'your-admin-email@example.com' && (
                <Link href="/admin" className="text-sm font-medium hover:text-primary-500">
                  管理
                </Link>
              )}
              <button 
                onClick={() => signOut()}
                className="text-sm font-medium hover:text-primary-500"
              >
                退出
              </button>
            </>
          ) : (
            <button 
              onClick={() => signIn('google')}
              className="rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600"
            >
              登录
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/" className="block py-2">首页</Link>
            <Link href="/tools" className="block py-2">工具库</Link>
            <SearchBar />
            {session ? (
              <button 
                onClick={() => signOut()}
                className="flex items-center gap-2 py-2 text-red-500"
              >
                <LogOut className="h-4 w-4" />
                退出登录
              </button>
            ) : (
              <button 
                onClick={() => signIn('google')}
                className="w-full rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white"
              >
                登录
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
