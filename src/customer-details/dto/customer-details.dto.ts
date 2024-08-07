import {
    IsString,
    IsOptional,
    ValidateNested,
    IsNotEmpty,
    IsInt,
    IsEmail,
    IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsTenDigitNumber } from 'utils/validation/phoneNumberValidation';
import { CreateAddressDto } from 'src/user/dto/create-and-update-address.dto';

export class CreateCustomerDetailsDto {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsEmail({}, { message: 'Please provide a valid email address.' })
    @IsOptional()
    email?: string;

    @IsNotEmpty({ message: 'Mobile number must not be empty' })
    @IsString({ message: 'Mobile number must be a string' })
    @IsTenDigitNumber({ message: 'Mobile number must be a 10-digit number' })
    mobileNumber: string;

    @IsOptional()
    @IsNotEmpty({ message: ' Additional Details must not be empty' })
    @IsString({ message: 'Additional Details must be a String' })
    additionalDetails: string
  
    @IsNotEmpty({ message: 'Customer Address must not be empty.' })
    @ValidateNested()
    @IsDefined()
    @Type(() => CreateAddressDto)
    address:CreateAddressDto

}
export class UpdateCustomerDetailsDto {
    @IsOptional()
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsEmail({}, { message: 'Please provide a valid email address.' })
    @IsOptional()
    email?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Mobile number must not be empty' })
    @IsString({ message: 'Mobile number must be a string' })
    @IsTenDigitNumber({ message: 'Mobile number must be a 10-digit number' })
    mobileNumber: string;

    @IsOptional()
    @IsNotEmpty({ message: ' AdditionalDetails must not be empty' })
    @IsString({ message: 'AdditionalDetails must be a String' })
    additionalDetails: string

}
