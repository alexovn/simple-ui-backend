import { Post } from "src/post/interfaces/post.interface"
import { Role as PrismaRole } from '@prisma/client'

export interface User {
  id: number
  createdAt: Date
  email: string
  password: string
  firstName: string | null
  lastName: string | null
  role: PrismaRole
  posts: Post[]
}