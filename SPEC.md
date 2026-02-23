# AI 资讯网站 - 项目规格文档

## 1. 项目概述

- **项目名称**: AI Nexus (AI 资讯中心)
- **类型**: 资讯分享社区
- **核心功能**: AI 新闻/工具/教程分享、用户社区、收藏评论
- **目标用户**: AI 从业者、爱好者、学生

---

## 2. 技术栈

| 模块 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| UI | Tailwind CSS + Shadcn UI |
| 认证 | NextAuth.js (Google OAuth) |
| 数据库 | Prisma + SQLite (可迁移 PostgreSQL) |
| 部署 | Vercel |

---

## 3. 页面结构

### 前台 (用户访问)

| 页面 | 路径 | 功能 |
|------|------|------|
| 首页 | `/` | 热门文章、分类浏览、搜索 |
| 文章详情 | `/articles/[slug]` | 文章内容、评论、收藏 |
| 分类页 | `/category/[slug]` | 分类下文章列表 |
| 工具库 | `/tools` | AI 工具收集 |
| 用户主页 | `/profile/[id]` | 用户收藏夹、发布 |
| 登录 | `/login` | Google 登录 |

### 后台 (管理面板)

| 页面 | 路径 | 功能 |
|------|------|------|
| 管理首页 | `/admin` | 数据概览 |
| 文章管理 | `/admin/articles` | CRUD 文章 |
| 用户管理 | `/admin/users` | 用户列表、权限 |
| 分类管理 | `/admin/categories` | 分类 CRUD |
| 评论管理 | `/admin/comments` | 评论审核 |

---

## 4. 数据库模型

### User (用户)
- id, email, name, image, role (USER/ADMIN), createdAt

### Article (文章)
- id, title, slug, content, excerpt, coverImage
- authorId, categoryId, published, createdAt, updatedAt

### Category (分类)
- id, name, slug, description, icon

### Comment (评论)
- id, content, articleId, authorId, parentId, createdAt

### Favorite (收藏)
- id, userId, articleId, createdAt

---

## 5. UI 设计

### 配色方案
- 主色: `#6366f1` (Indigo)
- 背景: `#09090b` (深色) / `#ffffff` (浅色)
- 强调: `#8b5cf6` (Purple)

### 布局
- 响应式: 移动端 / 平板 / 桌面
- 导航: 固定顶部 + 侧边栏
- 卡片式文章列表

### 组件
- Navbar (导航)
- ArticleCard (文章卡片)
- CategoryTag (分类标签)
- CommentSection (评论)
- SearchBar (搜索)
- UserAvatar (头像)

---

## 6. 功能清单

### MVP (第一版)
- [x] Google 登录
- [x] 浏览文章列表
- [x] 阅读文章详情
- [x] 收藏文章
- [x] 发布评论
- [x] 搜索文章
- [x] 分类筛选

### 后台管理
- [ ] 登录后跳转管理员
- [ ] 文章管理 CRUD
- [ ] 分类管理

---

## 7. 路由结构

```
/
├── login
├── api
│   ├── auth/[...nextauth]
│   └── articles
├── admin
│   ├── articles
│   ├── categories
│   └── users
├── articles
│   └── [slug]
├── └── [slug]
 category
│  ├── tools
└── profile
    └── [id]
```

---

*创建时间: 2026-02-23*
