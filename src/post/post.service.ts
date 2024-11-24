import { BadRequestException, Injectable } from "@nestjs/common";
import { Post, Posts } from "./interfaces/post.interface";
import { PrismaService } from "src/prisma/prisma.service";

import { PostCreateDto } from "./dto/post-create.dto";
import { PostUpdateDto } from "./dto/post-update.dto";
import { PostsGetQueryDto } from "./dto/posts-get.dto";
import { PostGetParamsDto } from "./dto/post-get.dto";
import { PostUpdateParamsDto } from "./dto/post-update.dto";
import { PostDeleteParamsDto } from "./dto/post-delete.dto";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async getPost(params: PostGetParamsDto): Promise<Post | null> {
    const { id } = params

    const post =  await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })
    if (!post) {
      throw new BadRequestException('Post not found')
    }
    return post
  }

  async getPosts(query: PostsGetQueryDto): Promise<Posts> {
    const {
      page = 1,
      limit = 10,
      orderBy = 'createdAt',
      orderDirection = 'desc',
      filter
    } = query

    const skip = (page - 1) * limit

    const posts = await this.prisma.post.findMany({
      skip,
      take: limit,
      orderBy: { [orderBy]: orderDirection },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      where: {
        authorId: filter?.authorId
      }
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
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })
  }

  async updatePost(
    {
      params,
      data,
      authorId
    }:{
      params: PostUpdateParamsDto,
      data: PostUpdateDto,
      authorId: string
    }
  ): Promise<Post> {
    const { id } = params

    return await this.prisma.post.update({
      where: { id },
      data: {
        ...data,
        author: {
          connect: {
            id: authorId,
          }
        }
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })
  }

  async deletePost(params: PostDeleteParamsDto): Promise<Post> {
    const { id } = params

    const post = await this.prisma.post.delete({
      where: { id },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })
    if (!post) {
      throw new BadRequestException('Post not found')
    }
    return post
  }
}