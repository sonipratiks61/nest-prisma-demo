import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Get,
  Put,
  Res,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/category.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResponseService } from 'utils/response/customResponse';
import { IdValidationPipe } from 'utils/validation/paramsValidation';
import { UpdateCategoryDto } from './dto/update.category.dto';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly responseService: ResponseService,
  ) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Req() req,
    @Res() res,
  ) {
    try {
      const userId = req.user.id; 
      const { message } = await this.categoryService.create(createCategoryDto, userId);
      this.responseService.sendSuccess(res, message);
    } catch (error) {
      console.error(error);
      if (error instanceof NotFoundException) {
        this.responseService.sendNotFound(res, error.message);
      } else {
        this.responseService.sendInternalError(
          res,
          error.message|| 'Something Went Wrong',
        );
      }
    }
  }


  @Get()
  @UseGuards(AuthGuard('jwt')) // Ensures only authenticated users can access this route
  async fetchAll(@Res() res) {
    try {
      const categories = await this.categoryService.findAll();
      this.responseService.sendSuccess(
        res,
        'Categories Fetched Successfully',
        categories,
      );
    } catch (error) {
      this.responseService.sendInternalError(
        res,
        error.message || 'Something Went Wrong'
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id', IdValidationPipe) id: string, @Res() res) {
    try {
      const categoryId = parseInt(id, 10);
      const category = await this.categoryService.findOne(categoryId);
      if (!category) {
        this.responseService.sendNotFound(
          res,
          "CategoryId Invalid",
        );
      }
      this.responseService.sendSuccess(res, 'Fetch Successfully', category);
    } catch (error) {
      console.log(error);
        this.responseService.sendInternalError(
          res,
          error.message || 'Something Went Wrong',
        );
        return;
      }
    }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Res() res,
  ) {
    try {
      const categoryId = parseInt(id, 10);
      const category = await this.categoryService.findOne(categoryId);
      if (!category) {
        this.responseService.sendNotFound(
          res,
          `Category with ID ${id} not found`,
        );
      }
      const updatedCategory = await this.categoryService.update(
        categoryId,
        updateCategoryDto,
      );
      this.responseService.sendSuccess(
        res,
        'Category Updated Successfully',
        updatedCategory,
      );
    } catch (error) {
      console.log(error);
        this.responseService.sendInternalError(
          res,
          error.message || 'Something Went Wrong',
        
        );
      
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id', IdValidationPipe) id: string, @Res() res) {
    const categoryId = parseInt(id, 10);
    try {
      const category = await this.categoryService.findOne(categoryId);
      if (!category) {
        this.responseService.sendNotFound(
          res,
          `Category with ID ${id} not found`,
        );
      }
      await this.categoryService.remove(categoryId);
      this.responseService.sendSuccess(res, 'Category Deleted Successfully');
    } catch (error) {
      console.error(error);
     
        this.responseService.sendInternalError(
          res,
          'Something Went Wrong',
        );
      }
    }
  }

