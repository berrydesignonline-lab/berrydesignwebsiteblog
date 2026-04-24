import type { Metadata } from "next"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === "ar" ? "المدونة — بيري ديزاين قطر" : "Blog — Berry Design Qatar",
    description: locale === "ar" ? "أخبار ونصائح التصميم للمؤسسات التعليمية في قطر" : "Design insights and news for educational institutions in Qatar",
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  return (
    <main className="min-h-screen bg-cream pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-semibold text-navy mb-4">
          {locale === "ar" ? "المدونة" : "Blog"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "ar" ? `مقالة: ${slug}` : `Post: ${slug}`}
        </p>
        <p className="mt-8 text-muted-foreground">
          {locale === "ar" ? "محتوى قادم قريباً" : "Content coming soon."}
        </p>
      </div>
    </main>
  )
}
