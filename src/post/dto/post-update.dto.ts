import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from "class-validator";

export class PostUpdateDto {
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string
}

export class PostUpdateParamsDto {
  @IsUUID()
  id: string
}