import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post-create.dto';
import { PostUpdateDto } from './dto/post-update.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { GetPostByIdDto } from './dto/get-post-by-id.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Public()
  @Get(':id')
  async getPost(@Param() params: GetPostByIdDto) {
    return this.postService.getPost(params)
  }

  @Public()
  @Get()
  async getPosts(@Query() paginationDto: PaginationDto) {
    return this.postService.getPosts(paginationDto)
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
    @Param('id') id: string,
    @Body() data: PostUpdateDto,
    @User('id') authorId: string
  ) {
    return this.postService.updatePost({ id, data, authorId })
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id)
  }
}