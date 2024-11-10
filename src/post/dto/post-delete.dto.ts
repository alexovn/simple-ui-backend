import { IsUUID } from "class-validator";

export class PostDeleteParamsDto {
  @IsUUID()
  id: string
}