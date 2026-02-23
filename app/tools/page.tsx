import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { ExternalLink, Star, GitFork } from 'lucide-react'

// Mock data for AI tools (in production, store in database)
const aiTools = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'OpenAI 的大型语言模型，支持对话、写作、编程等',
    category: '对话 AI',
    url: 'https://chat.openai.com',
    stars: 150000,
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'AI 图像生成工具，通过文字描述创建精美图片',
    category: '图像生成',
    url: 'https://midjourney.com',
    stars: 120000,
  },
  {
    id: '3',
    name: 'Claude',
    description: 'Anthropic 开发的 AI 助手，擅长分析和写作',
    category: '对话 AI',
    url: 'https://claude.ai',
    stars: 85000,
  },
  {
    id: '4',
    name: 'Copilot',
    description: 'GitHub AI 编程助手，提升开发效率',
    category: '编程助手',
    url: 'https://github.com/features/copilot',
    stars: 95000,
  },
  {
    id: '5',
    name: 'Stable Diffusion',
    description: '开源图像生成模型，可本地部署',
    category: '图像生成',
    url: 'https://stability.ai',
    stars: 75000,
  },
  {
    id: '6',
    name: 'Notion AI',
    description: '笔记工具的 AI 助手，辅助写作和整理',
    category: '生产力',
    url: 'https://notion.so/product/ai',
    stars: 60000,
  },
]

export default function ToolsPage() {
  const categories = [...new Set(aiTools.map(t => t.category))]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">AI 工具库</h1>
        <p className="mt-2 text-muted-foreground">
          精选 AI 工具和资源
        </p>
      </div>

      {categories.map(category => (
        <section key={category}>
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {aiTools
              .filter(t => t.category === category)
              .map(tool => (
                <a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg border bg-card p-4 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold group-hover:text-primary-500">
                      {tool.name}
                    </h3>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3" />
                    {tool.stars.toLocaleString()}
                  </div>
                </a>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}
