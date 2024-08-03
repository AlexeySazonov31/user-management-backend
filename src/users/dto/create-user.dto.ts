import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsInt()
  @IsNotEmpty()
  height: number;

  @IsInt()
  @IsNotEmpty()
  weight: number;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  residence: string;

  @IsString()
  @IsOptional()
  photo?: string;
}
