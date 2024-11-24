import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { PostService } from './post.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from 'src/auth/decorators/user.decorator';

import { PostCreateDto } from './dto/post-create.dto';
import { PostUpdateDto } from './dto/post-update.dto';
import { PostGetParamsDto } from './dto/post-get.dto';
import { PostUpdateParamsDto } from './dto/post-update.dto'
import { PostsGetQueryDto } from "./dto/posts-get.dto";
import { PostDeleteParamsDto } from "./dto/post-delete.dto";

@Controller('api/posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Get(':id')
  async getPost(@Param() params: PostGetParamsDto) {
    return this.postService.getPost(params)
  }

  @Public()
  @Get()
  async getPosts(@Query() query: PostsGetQueryDto) {
    return this.postService.getPosts(query)
  }

  @Post()
  async createPost(
    @Body() data: PostCreateDto,
    @User('id') authorId: string
  ) {
    return this.postService.createPost(data, authorId)
  }

  @Patch(':id')
  async updatePost(
    @Param() params: PostUpdateParamsDto,
    @Body() data: PostUpdateDto,
    @User('id') authorId: string
  ) {
    return this.postService.updatePost({ params, data, authorId })
  }

  @Delete(':id')
  async deletePost(@Param() params: PostDeleteParamsDto) {
    return this.postService.deletePost(params)
  }
}