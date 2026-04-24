"use client"

import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/lib/sanity/client"

const components = {
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

export function BlogBody({ body, isAr }: { body: any; isAr: boolean }) {
  if (!body) {
    return (
      <p className="text-muted-foreground text-center py-12">
        {isAr ? "المحتوى قادم قريباً." : "Content coming soon."}
      </p>
    )
  }
  return (
    <div className={isAr ? "text-right" : "text-left"}>
      <PortableText value={body} components={components} />
    </div>
  )
}
