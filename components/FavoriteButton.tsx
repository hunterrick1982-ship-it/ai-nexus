'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface FavoriteButtonProps {
  articleId: string
  initialCount: number
}

export function FavoriteButton({ articleId, initialCount }: FavoriteButtonProps) {
  const [count, setCount] = useState(initialCount)
  const [favorited, setFavorited] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleFavorite = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId }),
      })
      if (res.ok) {
        const data = await res.json()
        setFavorited(data.favorited)
        setCount(data.favorited ? count + 1 : count - 1)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`flex items-center gap-1 transition-colors ${
        favorited ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
      }`}
    >
      <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
      <span>{count}</span>
    </button>
  )
}
