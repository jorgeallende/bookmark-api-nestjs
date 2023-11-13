import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class BookmarkDTO {
  @IsNotEmpty({ message: 'Titulo é obrigatório' })
  @IsString({
    message:
      'Titulo (field: title) deve ser uma string',
  })
  title: string;

  @IsString({
    message:
      'Titulo (field: title) deve ser uma string',
  })
  description: string;

  @IsString({
    message:
      'Titulo (field: title) deve ser uma string',
  })
  link: string;

  @IsNumber(
    {},
    {
      message:
        'UserId (field: userId) deve ser um número',
    },
  )
  @Transform(({ value }) => Number(value))
  userId: number;
}
