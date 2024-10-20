import { Injectable } from "@nestjs/common";
import { Post } from "./interfaces/post.interface";
import { PostCreateDto } from "./dto/post-create.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PostUpdateDto } from "./dto/post-update.dto";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getPost(id: number): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id }
    })
  }

  async getPosts(): Promise<Post[]> {
    return this.prisma.post.findMany()
  }

  async createPost(data: PostCreateDto): Promise<Post> {
    return this.prisma.post.create({
      data
    })
  }

  async updatePost(params: { id: number, data: PostUpdateDto }): Promise<Post> {
    const { id, data } = params

    return this.prisma.post.update({
      where: { id },
      data
    })
  }

  async deletePost(id: number): Promise<Post> {
    return this.prisma.post.delete({
      where: { id }
    })
  }
}