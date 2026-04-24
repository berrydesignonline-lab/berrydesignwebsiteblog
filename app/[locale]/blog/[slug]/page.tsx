import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BlogBody } from "@/components/blog-body"
import { getBlogPostBySlug } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/client"

export const dynamic = "force-dynamic"

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: "Post Not Found" }
  const isAr = locale === "ar"
  return {
    title: `${isAr ? post.titleAr : post.titleEn} — Berry Design Qatar`,
    description: isAr ? post.excerptAr : post.excerptEn,
  }
}


export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  const isAr = locale === "ar"
  const post = await getBlogPostBySlug(slug)

  if (!post) notFound()

  const title = isAr ? post.titleAr : post.titleEn
  const body = isAr ? post.bodyAr : post.bodyEn
  const category = isAr ? post.categoryAr : post.categoryEn

  return (
    <div className="min-h-screen bg-background">
      <Navbar locale={locale} />

      {/* Hero / Cover */}
      <section className="relative bg-navy pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral/10 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-3xl relative z-10">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group"
          >
            <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${isAr ? "rotate-180" : ""}`} />
            {isAr ? "العودة للمدونة" : "Back to Blog"}
          </Link>

          {category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/20 text-coral text-xs font-medium mb-4">
              <Tag className="w-3 h-3" />
              {category}
            </span>
          )}

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            {title}
          </h1>

          {post.publishedAt && (
            <div className="flex items-center gap-2 text-white/50 text-sm">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString(
                isAr ? "ar-QA" : "en-GB",
                { day: "numeric", month: "long", year: "numeric" }
              )}
            </div>
          )}
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="container mx-auto max-w-3xl px-4 -mt-6 relative z-20">
          <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[16/9]">
            <Image
              src={urlFor(post.coverImage).width(900).height(506).url()}
              alt={title}
              width={900}
              height={506}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Body */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <BlogBody body={body} isAr={isAr} />

          {/* Divider */}
          <div className="border-t border-border mt-12 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors group"
            >
              <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${isAr ? "rotate-180" : ""}`} />
              {isAr ? "كل المقالات" : "All articles"}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-coral text-white text-sm font-medium hover:bg-coral/90 transition-colors"
            >
              {isAr ? "تواصل معنا" : "Get in touch"}
              <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-coral/20 text-coral text-sm font-medium mb-4">
            {isAr ? "هل أنت مهتم؟" : "Interested?"}
          </span>
          <h2 className="text-3xl font-bold text-white mb-4">
            {isAr
              ? "هل تريد تصميماً مميزاً لمدرستك؟"
              : "Want a standout design for your school?"}
          </h2>
          <p className="text-white/60 mb-8">
            {isAr
              ? "نحن نصمم للمدارس والحضانات في قطر. تواصل معنا اليوم."
              : "We design for schools and nurseries across Qatar. Let's talk."}
          </p>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-coral text-white font-semibold hover:bg-coral/90 transition-colors"
          >
            {isAr ? "ابدأ مشروعك" : "Start your project"}
            <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
