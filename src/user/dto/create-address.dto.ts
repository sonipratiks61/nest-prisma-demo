import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsPostalCode } from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'The country where the user resides',
    example: 'United States',
  })
  @IsNotEmpty({ message: 'country cannot be empty' })
  @IsString({ message: 'country must be a string' })
  country: string;
  @ApiProperty({
    description: 'The state or province where the user resides',
    example: 'California',
  })
  @IsNotEmpty({ message: 'state cannot be empty' })
  @IsString({ message: 'state must be a string' })
  state: string;

  @ApiProperty({
    description: 'The city where the user resides',
    example: 'San Francisco',
  })
  @IsNotEmpty({ message: 'City cannot be empty' })
  @IsString({ message: 'City must be a string' })
  city: string;

  @ApiProperty({
    description: "The postal code of the user's address",
    example: '941038',
  })
  // @IsPostalCode()
  // @IsNotEmpty({ message: 'pinCode cannot be empty.' })
  // @IsPostalCode('IN')
  @IsNotEmpty({ message: 'pinCode cannot be empty.' })
  @IsPostalCode('IN')
  pinCode: string; // Validate without specific locale

  @ApiProperty({
    description:
      'The full address line including street name, building number, etc.',
    example: '123 Main St, Apt 101',
  })
  @IsNotEmpty({ message: 'address cannot be empty.' })
  @IsString({ message: 'address must be a string' })
  address: string;
}
