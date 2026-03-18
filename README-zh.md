# Aubrey的skills仓库

本仓库包含Aubrey开发的skill，在`skills`目录下。

## 多语言README

- [English](README.md)
- [中文](README-zh.md)

## 项目结构

```
aubrey-skills/
├── skills/
│   └── website-content-fetch/      # 网站内容抓取技能
│       ├── evals/                  # 评估文件
│       │   └── evals.json
│       ├── scripts/                # 主要脚本文件
│       │   └── fetch-content.js    # 核心功能
│       ├── SKILL.md                # 技能文档
│       └── package.json            # 依赖项
├── README.md                       # 英文说明文档
├── README-zh.md                    # 中文说明文档
└── .gitignore
```

## 可用技能

### website-content-fetch

一个用于从网站抓取和提取内容的技能，包括文本内容和媒体资源。

#### 功能

- **文本内容提取**：从网页中提取所有文本内容
- **媒体资源检测**：识别并收集媒体文件的URL，包括：
  - 图片
  - 视频
  - 音频文件
- **媒体保存（可选）**：可以将媒体文件保存到指定目录

#### 依赖项

- axios：用于发送HTTP请求
- cheerio：用于解析HTML内容

#### 使用方法

1. 安装依赖项：

   ```bash
   cd skills/website-content-fetch
   npm install
   ```

2. 运行技能：

   ```bash
   node scripts/fetch-content.js <url> [save-directory]
   ```

   - `<url>`：要抓取内容的网站URL
   - `[save-directory]`：可选的媒体文件保存目录

#### 示例

```bash
# 从网站抓取内容
node scripts/fetch-content.js https://example.com

# 抓取内容并保存媒体文件
node scripts/fetch-content.js https://example.com ./media
```

## 未来技能

本仓库旨在随着新技能的开发而增长。每个技能将在`skills`文件夹下的自己的目录中研发。

## 贡献

这是一个个人项目，但欢迎分叉并根据自己的需要调整这些技能。

## 许可证

MIT
