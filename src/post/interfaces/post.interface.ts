export interface Post {
  id: number
  createdAt: Date
  updatedAt: Date
  published: boolean
  title: string
  description: string
  authorId: number | null
}