import {
    IsString,
    IsOptional,
    ValidateNested,
    IsNotEmpty,
    IsInt,
    IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsTenDigitNumber } from 'utils/validation/phoneNumberValidation';

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

    // @IsNotEmpty({ message: 'Address must not be empty' })
    // @IsInt({ message: 'Address must be a Integer' })
    // addressId: number

    @IsNotEmpty({ message: ' AdditionalDetails must not be empty' })
    @IsString({ message: 'AdditionalDetails must be a String' })
    additionalDetails: string

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
    @IsNotEmpty({ message: 'Address must not be empty' })
    @IsInt({ message: 'Address must be a Integer' })
    addressId: number

    @IsOptional()
    @IsNotEmpty({ message: ' AdditionalDetails must not be empty' })
    @IsString({ message: 'AdditionalDetails must be a String' })
    additionalDetails: string

}