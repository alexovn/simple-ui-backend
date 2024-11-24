export interface Post {
  id: string
  createdAt: Date
  updatedAt: Date
  published: boolean
  title: string
  description: string
  authorId: string
  author: {
    firstName: string | null
    lastName: string | null
  }
}

export interface Posts {
  data: Post[],
  meta: {
    page: number,
    total: number,
    totalPages: number
  }
}