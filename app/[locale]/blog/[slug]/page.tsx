import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react"
import { PortableText } from "@portabletext/react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-coral pl-5 my-6 italic text-muted-foreground text-lg">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="text-foreground/80 leading-relaxed mb-5 text-[1.05rem]">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-coral underline underline-offset-2 hover:text-coral/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="my-8 rounded-xl overflow-hidden">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || ""}
          width={800}
          height={450}
          className="w-full object-cover"
        />
        {value.caption && (
          <p className="text-center text-sm text-muted-foreground mt-2">{value.caption}</p>
        )}
      </div>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside space-y-2 mb-5 text-foreground/80">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside space-y-2 mb-5 text-foreground/80">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
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
          {body ? (
            <div className={isAr ? "text-right" : "text-left"}>
              <PortableText value={body} components={portableTextComponents} />
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-12">
              {isAr ? "المحتوى قادم قريباً." : "Content coming soon."}
            </p>
          )}

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
