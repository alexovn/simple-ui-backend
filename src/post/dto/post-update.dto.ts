import { ApiProperty } from "@nestjs/swagger"

export class PostUpdateDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string
}