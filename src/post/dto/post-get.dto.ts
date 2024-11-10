import { IsUUID } from "class-validator";

export class PostGetParamsDto {
  @IsUUID()
  id: string
}