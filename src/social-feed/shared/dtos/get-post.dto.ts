import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsUrl, Max, Min } from 'class-validator'

export class GetPostDto {
  @IsNotEmpty()
  @IsUrl()
  url: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(25)
  limit?: number = 5
}
