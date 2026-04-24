import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schema } from "./schema"

export default defineConfig({
  name: "berry-design-qatar",
  title: "Berry Design Qatar",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Portfolio Projects")
              .schemaType("portfolio")
              .child(S.documentTypeList("portfolio").title("Portfolio Projects")),
            S.listItem()
              .title("Blog Posts")
              .schemaType("blog")
              .child(S.documentTypeList("blog").title("Blog Posts")),
          ]),
    }),
    visionTool(),
  ],
  schema,
})
