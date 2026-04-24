import { defineField, defineType } from "sanity"

export const blogSchema = defineType({
  name: "blog",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "titleEn",
      title: "Title (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleAr",
      title: "Title (Arabic)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "titleEn", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerptEn",
      title: "Excerpt (English)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "excerptAr",
      title: "Excerpt (Arabic)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "bodyEn",
      title: "Body (English)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "bodyAr",
      title: "Body (Arabic)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryEn",
      title: "Category (English)",
      type: "string",
      options: {
        list: [
          { title: "Design Tips", value: "Design Tips" },
          { title: "School Branding", value: "School Branding" },
          { title: "Qatar Education", value: "Qatar Education" },
          { title: "Case Study", value: "Case Study" },
          { title: "News", value: "News" },
        ],
      },
    }),
    defineField({
      name: "categoryAr",
      title: "Category (Arabic)",
      type: "string",
      options: {
        list: [
          { title: "نصائح تصميم", value: "نصائح تصميم" },
          { title: "هوية المدارس", value: "هوية المدارس" },
          { title: "التعليم في قطر", value: "التعليم في قطر" },
          { title: "دراسة حالة", value: "دراسة حالة" },
          { title: "أخبار", value: "أخبار" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "titleEn", subtitle: "categoryEn", media: "coverImage" },
  },
})
