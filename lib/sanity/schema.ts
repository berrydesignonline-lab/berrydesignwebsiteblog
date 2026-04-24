import { portfolioSchema } from "./schemas/portfolio"
import { blogSchema } from "./schemas/blog"

export const schema = {
  types: [portfolioSchema, blogSchema],
}
