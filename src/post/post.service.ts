import { BadRequestException, Injectable } from "@nestjs/common";
import { Post, Posts } from "./interfaces/post.interface";
import { PostCreateDto } from "./dto/post-create.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PostUpdateDto } from "./dto/post-update.dto";
import { PostsRequestDto } from "./dto/posts-request.dto";
import { GetPostByIdDto } from "./dto/get-post-by-id.dto";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getPost(params: GetPostByIdDto): Promise<Post | null> {
    const { id } = params

    const post =  await this.prisma.post.findUnique({
      where: { id }
    })
    if (!post) {
      throw new BadRequestException('Post not found')
    }
    return post
  }

  async getPosts(postsRequestDto: PostsRequestDto): Promise<Posts> {
    const {
      page = 1,
      limit = 10,
      orderBy = 'createdAt',
      orderDirection = 'desc'
    } = postsRequestDto

    const skip = (page - 1) * limit

    const posts = await this.prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { [orderBy]: orderDirection }
    })

    const total = await this.prisma.post.count()
    const totalPages = Math.ceil(total / limit)

    return {
      data: posts,
      meta: {
        page: page,
        total,
        totalPages,
      }
    }
  }

  async createPost(data: PostCreateDto, authorId: string): Promise<Post> {
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

  async updatePost(params: { id: string, data: PostUpdateDto, authorId: string }): Promise<Post> {
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

  async deletePost(id: string): Promise<Post> {
    const post = await this.prisma.post.delete({
      where: { id }
    })
    if (!post) {
      throw new BadRequestException('Post not found')
    }
    return post
  }
}