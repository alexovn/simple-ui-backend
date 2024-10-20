import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post-create.dto';
import { PostUpdateDto } from './dto/post-update.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPost(@Param('id') id: string) {
    return this.postService.getPost(Number(id))
  }

  @Get()
  async getPosts() {
    return this.postService.getPosts()
  }

  @Post()
  async createPost(@Body() data: PostCreateDto) {
    return this.postService.createPost(data)
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() data: PostUpdateDto) {
    return this.postService.updatePost({id: Number(id), data})
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postService.deletePost(Number(id))
  }
}