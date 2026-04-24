import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Calendar, Tag } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getAllBlogPosts } from "@/lib/sanity/queries"
import { urlFor } from "@/lib/sanity/client"

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === "ar" ? "المدونة — بيري ديزاين قطر" : "Blog — Berry Design Qatar",
    description: locale === "ar"
      ? "نصائح تصميم وأخبار للمؤسسات التعليمية في قطر"
      : "Design tips and news for educational institutions in Qatar",
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  const isAr = locale === "ar"
  const posts = await getAllBlogPosts()

  return (
    <div className="min-h-screen bg-background">
      <Navbar locale={locale} />

      {/* Hero */}
      <section className="bg-navy pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-coral/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-coral/8 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group"
          >
            <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${isAr ? "rotate-180" : ""}`} />
            {isAr ? "العودة للرئيسية" : "Back to Home"}
          </Link>
          <span className="inline-block px-4 py-1.5 rounded-full bg-coral/20 text-coral text-sm font-medium mb-4">
            {isAr ? "المدونة" : "Blog"}
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            {isAr ? "أفكار وأخبار" : "Insights & News"}
          </h1>
          <p className="text-lg text-white/60 max-w-xl">
            {isAr
              ? "نصائح تصميم وقصص نجاح من تجربتنا مع المؤسسات التعليمية في قطر."
              : "Design tips, case studies, and stories from working with Qatar's schools and nurseries."}
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {posts.length === 0 ? (
            /* Empty state */
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <Tag className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {isAr ? "لا توجد مقالات بعد" : "No posts yet"}
              </h2>
              <p className="text-muted-foreground mb-8">
                {isAr ? "تابعونا قريباً لمزيد من المحتوى." : "Check back soon — content is coming."}
              </p>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 text-coral font-medium hover:underline"
              >
                {isAr ? "العودة للرئيسية" : "Back to Home"}
                <ArrowRight className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any, i: number) => (
                <Link
                  key={post._id}
                  href={`/${locale}/blog/${post.slug.current}`}
                  className="group flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-coral hover:shadow-xl transition-all duration-300"
                >
                  {/* Cover image */}
                  <div className="relative aspect-[16/10] bg-secondary overflow-hidden">
                    {post.coverImage ? (
                      <Image
                        src={urlFor(post.coverImage).width(600).height(375).url()}
                        alt={isAr ? post.titleAr : post.titleEn}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy/60 flex items-center justify-center">
                        <span className="text-white/20 text-5xl font-bold">B</span>
                      </div>
                    )}
                    {(post.categoryEn || post.categoryAr) && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-coral text-white text-xs font-medium">
                        {isAr ? post.categoryAr : post.categoryEn}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {post.publishedAt && (
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.publishedAt).toLocaleDateString(
                          isAr ? "ar-QA" : "en-GB",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </div>
                    )}
                    <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-coral transition-colors line-clamp-2">
                      {isAr ? post.titleAr : post.titleEn}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                      {isAr ? post.excerptAr : post.excerptEn}
                    </p>
                    <div className="flex items-center gap-1.5 text-coral text-sm font-medium mt-4">
                      {isAr ? "اقرأ المزيد" : "Read more"}
                      <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? "rotate-180" : ""}`} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
