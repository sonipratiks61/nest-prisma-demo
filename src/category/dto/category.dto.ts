import {
  IsString,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
  IsInt,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSubCategoryDto } from './subcategory.dto'; // Adjust the import path as needed

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsNotEmpty({ message: 'Type cannot be empty' })
  @IsString({ message: 'Type must be a string' })
  type: string;

  @IsInt({ message: 'Parent Id must be a number' })
  parentId?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateSubCategoryDto)
  @IsDefined()
  subCategories?: CreateSubCategoryDto[];
}
