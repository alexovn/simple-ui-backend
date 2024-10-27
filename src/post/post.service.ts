import { BadRequestException, Injectable } from "@nestjs/common";
import { Post } from "./interfaces/post.interface";
import { PostCreateDto } from "./dto/post-create.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PostUpdateDto } from "./dto/post-update.dto";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getPost(id: number): Promise<Post | null> {
    const post =  await this.prisma.post.findUnique({
      where: { id }
    })
    if (!post) {
      throw new BadRequestException('Post not found')
    }
    return post
  }

  async getPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany()
  }

  async createPost(data: PostCreateDto, authorId: number): Promise<Post> {
    console.log(authorId)

    return await this.prisma.post.create({
      data: {
        ...data,
        author: {
          connect: {
            id: authorId
          }
        }
      }
    })
  }

  async updatePost(params: { id: number, data: PostUpdateDto, authorId: number }): Promise<Post> {
    const { id, data, authorId } = params

    return await this.prisma.post.update({
      where: { id },
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          }
        }
      }
    })
  }

  async deletePost(id: number): Promise<Post> {
    const post = await this.prisma.post.delete({
      where: { id }
    })
    if (!post) {
      throw new BadRequestException('Post not found')
    }
    return post
  }
}