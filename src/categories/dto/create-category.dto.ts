import { IsString, Matches } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Matches(/^(?!\s*$).+/)
  name: string;
}
