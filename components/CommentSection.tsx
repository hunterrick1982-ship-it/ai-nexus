'use client'

import { useState } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { MessageCircle, Send } from 'lucide-react'

interface CommentSectionProps {
  articleId: string
}

export function CommentSection({ articleId }: CommentSectionProps) {
  const { data: session } = useSession()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !session) return

    setLoading(true)
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, content }),
      })
      if (res.ok) {
        setContent('')
        window.location.reload()
      }
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="rounded-lg border bg-card p-6 text-center">
        <MessageCircle className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-muted-foreground">
          登录后参与评论
        </p>
        <button
          onClick={() => signIn('google')}
          className="mt-4 rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white"
        >
          Google 登录
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        {session.user?.image && (
          <img 
            src={session.user.image} 
            alt="" 
            className="h-10 w-10 rounded-full"
          />
        )}
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的评论..."
            className="w-full rounded-lg border bg-background p-3 min-h-[100px] resize-none focus:border-primary-500 focus:outline-none"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="flex items-center gap-2 rounded-full bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              发布
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
