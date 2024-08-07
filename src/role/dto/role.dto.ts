import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CapabilityDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateRoleDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  capabilityIds: number[];
}

export class UpdateRoleDto {
  @IsString()
  name: string;

  @IsArray()
  @IsInt({ each: true })
  capabilityIds: number[];
}