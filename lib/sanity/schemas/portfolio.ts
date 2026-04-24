import { defineField, defineType } from "sanity"

export const portfolioSchema = defineType({
  name: "portfolio",
  title: "Portfolio Project",
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
      name: "categoryEn",
      title: "Category (English)",
      type: "string",
      options: {
        list: [
          { title: "Brand Identity", value: "Brand Identity" },
          { title: "Website Design", value: "Website Design" },
          { title: "Print & Signage", value: "Print & Signage" },
          { title: "Social Media", value: "Social Media" },
          { title: "Marketing", value: "Marketing" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryAr",
      title: "Category (Arabic)",
      type: "string",
      options: {
        list: [
          { title: "الهوية البصرية", value: "الهوية البصرية" },
          { title: "تصميم المواقع", value: "تصميم المواقع" },
          { title: "المطبوعات واللافتات", value: "المطبوعات واللافتات" },
          { title: "وسائل التواصل", value: "وسائل التواصل" },
          { title: "التسويق", value: "التسويق" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first",
    }),
    defineField({
      name: "featured",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "titleEn", subtitle: "categoryEn", media: "image" },
  },
})
