import { ApiProperty } from "@nestjs/swagger"

export class PostCreateDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string
}