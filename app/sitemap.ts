import type { MetadataRoute } from "next"
import { getAllBlogPosts, getAllPortfolioProjects } from "@/lib/sanity/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://berrydesign.online"

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ar/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ar/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ]

  // Dynamic blog posts
  try {
    const posts = await getAllBlogPosts()
    for (const post of posts) {
      const slug = post.slug?.current || post.slug
      if (!slug) continue
      const updated = new Date(post._updatedAt || post.publishedAt || Date.now())
      routes.push(
        {
          url: `${baseUrl}/en/blog/${slug}`,
          lastModified: updated,
          changeFrequency: "monthly",
          priority: 0.6,
        },
        {
          url: `${baseUrl}/ar/blog/${slug}`,
          lastModified: updated,
          changeFrequency: "monthly",
          priority: 0.6,
        }
      )
    }
  } catch {
    // Silently fail — sitemap should not break the build
  }

  // Portfolio projects (use _id as slug since portfolio schema has no slug field)
  try {
    const projects = await getAllPortfolioProjects()
    for (const project of projects) {
      const slug = project._id.replace(/^portfolio-/, "")
      const updated = new Date(project._updatedAt || Date.now())
      routes.push(
        {
          url: `${baseUrl}/en/work/${slug}`,
          lastModified: updated,
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${baseUrl}/ar/work/${slug}`,
          lastModified: updated,
          changeFrequency: "monthly",
          priority: 0.7,
        }
      )
    }
  } catch {
    // Silently fail
  }

  return routes
}
