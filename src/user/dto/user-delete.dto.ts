import { IsUUID } from "class-validator";

export class UserDeleteParamsDto {
  @IsUUID()
  id: string
}