import {
  Controller,
  Get,
  UseGuards,
  Request,
  HttpStatus,
  Patch,
  Param,
  Body,
  ForbiddenException,
  Res,
  Req,
  Post,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseService } from 'utils/response/customResponse';
import { IdValidationPipe } from 'utils/validation/paramsValidation';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private responseService: ResponseService,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns the user profile',
    type: CreateUserDto,
  })
  getProfile(@Request() req, @Res() res) {
    try {
      const user = req.user;
      return this.responseService.sendSuccess(
        res,
        'User profile retrieved successfully',
        user,
      );
    } catch (error) {
      return this.responseService.sendInternalError(
        res,
        'Something Went Wrong',
        error,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'List of all users with addresses',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal Server Error',
  })
  @ApiBearerAuth()
  async findAllUsers(@Res() res) {
    try {
      const users = await this.userService.findAllUsersWithAddresses();
      return this.responseService.sendSuccess(
        res,
        'Users retrieved successfully',
        users,
      );
    } catch (error) {
      return this.responseService.sendInternalError(
        res,
        'Something went wrong',
        error,
      );
    }
  }

  @Patch('active/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Updated Successfully',
    type: CreateUserDto,
  })
  async setActiveStatus(
    @Param('id', IdValidationPipe) id: string,
    @Body('isActive') isActive: boolean,
    @Req() req,
    @Res() res,
  ) {
    try {
      if (req.user.id === Number(id)) {
        return this.responseService.sendBadRequest(
          res,
          'You cannot change your own active status.',
        );
      }

      const updatedUser = await this.userService.setActiveStatus(
        Number(id),
        isActive,
      );
      return this.responseService.sendSuccess(
        res,
        'User status updated successfully',
        updatedUser,
      );
    } catch (error) {
      console.log(error);
      if (error instanceof ForbiddenException) {
        return this.responseService.sendBadRequest(res, error.message);
      } else {
        return this.responseService.sendInternalError(
          res,
          error.message || 'Something went wrong',
          error,
        );
      }
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: CreateUserDto,
  })
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res) {
    try {
      const newUser = await this.userService.create(createUserDto);
      return this.responseService.sendSuccess(
        res,
        'User created successfully',
        newUser,
      );
    } catch (error) {
      console.log(error);
      return this.responseService.sendInternalError(res, error.message, error);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: UpdateUserDto,
  })
  async updateUser(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res,
  ) {
    try {
      const updatedUser = await this.userService.update(
        Number(id),
        updateUserDto,
      );
      return this.responseService.sendSuccess(
        res,
        'User updated successfully',
        updatedUser,
      );
    } catch (error) {
      return this.responseService.sendInternalError(res, error.message, error);
    }
  }
}
