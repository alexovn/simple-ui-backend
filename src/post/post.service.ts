import { BadRequestException, Injectable } from "@nestjs/common";
import { Post, Posts } from "./interfaces/post.interface";
import { PostCreateDto } from "./dto/post-create.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PostUpdateDto } from "./dto/post-update.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

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

  async getPosts(paginationDto: PaginationDto): Promise<Posts> {
    const {
      page = 1,
      limit = 10,
      orderBy = 'createdAt',
      orderDirection = 'desc'
    } = paginationDto

    const skip = (Number(page) - 1) * Number(limit)

    const posts = await this.prisma.post.findMany({
      skip,
      take: Number(limit),
      orderBy: { [orderBy]: orderDirection }
    })

    const total = await this.prisma.post.count()
    const totalPages = Math.ceil(total / Number(limit))

    return {
      data: posts,
      meta: {
        page: Number(page),
        total,
        totalPages,
      }
    }
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