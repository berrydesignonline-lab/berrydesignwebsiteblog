import { client } from "./client"

export async function getAllBlogPosts() {
  return client.fetch(
    `*[_type == "blog"] | order(publishedAt desc) {
      _id,
      titleEn,
      titleAr,
      slug,
      coverImage,
      excerptEn,
      excerptAr,
      categoryEn,
      categoryAr,
      publishedAt
    }`
  )
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] {
      _id,
      titleEn,
      titleAr,
      slug,
      coverImage,
      excerptEn,
      excerptAr,
      bodyEn,
      bodyAr,
      categoryEn,
      categoryAr,
      publishedAt
    }`,
    { slug }
  )
}

export async function getAllPortfolioProjects() {
  return client.fetch(
    `*[_type == "portfolio"] | order(order asc) {
      _id,
      titleEn,
      titleAr,
      categoryEn,
      categoryAr,
      image,
      featured
    }`
  )
}

export async function getFeaturedPortfolioProjects() {
  return client.fetch(
    `*[_type == "portfolio" && featured == true] | order(order asc) {
      _id,
      titleEn,
      titleAr,
      categoryEn,
      categoryAr,
      image
    }`
  )
}
