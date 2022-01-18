import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateHospitalDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly address: string;

  @IsString()
  @IsNotEmpty()
  public readonly phone: string;

  @IsString()
  @IsNotEmpty()
  public readonly email: string;

  @IsUrl()
  @IsOptional()
  public readonly website?: string;

  @IsString()
  @IsNotEmpty()
  public readonly description: string;

  @IsUrl()
  @IsNotEmpty()
  public readonly image: string;
}

export class UpdateHospitalDto extends PartialType(CreateHospitalDto) {}
