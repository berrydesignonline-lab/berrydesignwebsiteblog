import type { Metadata } from "next"

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === "ar" ? "أعمالنا — بيري ديزاين قطر" : "Our Work — Berry Design Qatar",
    description: locale === "ar" ? "دراسات حالة مشاريعنا التصميمية للمؤسسات التعليمية في قطر" : "Design case studies for educational institutions in Qatar",
  }
}

export default async function WorkPostPage({ params }: Props) {
  const { locale, slug } = await params
  return (
    <main className="min-h-screen bg-cream pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-semibold text-navy mb-4">
          {locale === "ar" ? "أعمالنا" : "Our Work"}
        </h1>
        <p className="text-muted-foreground">
          {locale === "ar" ? `مشروع: ${slug}` : `Project: ${slug}`}
        </p>
        <p className="mt-8 text-muted-foreground">
          {locale === "ar" ? "محتوى قادم قريباً" : "Content coming soon."}
        </p>
      </div>
    </main>
  )
}
