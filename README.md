# AI Nexus - AI 资讯网站

基于 Next.js 14 + NextAuth + Prisma 的 AI 资讯分享网站

## 功能特性

- 🔐 Google OAuth 登录
- 📝 文章发布与管理
- 💬 评论系统
- ⭐ 收藏功能
- 🔍 分类与搜索
- 🎨 响应式 UI (暗色/亮色)
- ⚡ 管理后台

## 快速开始

### 1. 安装依赖

```bash
cd D:\Rick知识库\Preoject\AI_Nexus
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`：

```env
# Google OAuth (从 https://console.cloud.google.com 获取)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# NextAuth
NEXTAUTH_SECRET=your-random-secret-string-min-32-chars
NEXTAUTH_URL=http://localhost:3000
```

### 3. 初始化数据库

```bash
npx prisma db push
```

### 4. 启动开发服务器

```bash
npm run dev
```

打开 http://localhost:3000

## 项目结构

```
AI_Nexus/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── articles/          # 文章详情页
│   ├── admin/             # 管理后台
│   ├── tools/             # 工具库
│   └── profile/           # 用户主页
├── components/            # React 组件
├── lib/                   # 工具函数
│   ├── auth.ts           # NextAuth 配置
│   └── prisma.ts         # Prisma 客户端
├── prisma/                # 数据库模型
│   └── schema.prisma
└── public/               # 静态资源
```

## 添加管理员

数据库中手动设置用户 role 为 ADMIN：

```bash
npx prisma studio
```

然后在 User 表中找到你的账号，将 role 改为 ADMIN。

## 部署

推荐使用 Vercel：

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署完成
