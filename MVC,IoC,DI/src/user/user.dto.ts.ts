import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @Transform(({ value }) => value.trim())
  public readonly name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Transform(({ value }) => value.trim())
  public readonly email: string;
}
