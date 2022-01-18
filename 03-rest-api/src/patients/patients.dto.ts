import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  public readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  public readonly age: number;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10)
  public readonly identityNumber: string;

  @IsString()
  @IsNotEmpty()
  public readonly address: string;

  @IsString()
  @IsNotEmpty()
  public readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly description: string;

  @IsUrl()
  @IsNotEmpty()
  public readonly image: string;

  @IsNumber()
  @IsOptional()
  public hospitalId?: number;
}

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
