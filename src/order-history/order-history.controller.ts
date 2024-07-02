
import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { ResponseService } from 'utils/response/customResponse';
import { AuthGuard } from '@nestjs/passport';
import { IdValidationPipe } from 'utils/validation/paramsValidation';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { CreateOrderHistoryDto } from './dto/order-history.dto';
import { OrderHistoryService } from './order-history.service';

@Controller('orderHistory')
export class OrderHistoryController  {
    constructor(private orderHistoryService: OrderHistoryService,
        private responseService: ResponseService) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Body() createOrderHistoryDto: CreateOrderHistoryDto,
        @Res() res,
        @Req() req
    ) {
        try {
            const ownerName=req.user.name

            const data = await this.orderHistoryService.create(createOrderHistoryDto,ownerName);
            this.responseService.sendSuccess(res, 'Created OrderHistory Successfully', data);
        }
        catch (error) {
            console.log(error)
            if (error instanceof NotFoundException) {
                this.responseService.sendBadRequest(res, error.message)
            }
            else {
                this.responseService.sendInternalError(res, 'Error in Creating Customer Details');
            }
        }
    }


    @Get()
    @UseGuards(AuthGuard('jwt')) // Ensures only authenticated users can access this route
    async fetchAll(@Res() res) {
        try {
            const data= await this.orderHistoryService.findAll();
            this.responseService.sendSuccess(
                res,
                'OrderHistory Fetched Successfully',
                data,
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
            const orderHistoryId= parseInt(id, 10);
            const orderHistory= await this.orderHistoryService.findOne(orderHistoryId);
            if (!orderHistory) {
                this.responseService.sendNotFound(
                    res,
                    "Invalid OrderHistoryId",
                );
            }
            this.responseService.sendSuccess(res, 'Fetch Successfully', orderHistory);
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
        @Body() createOrderHistoryDto: CreateOrderHistoryDto,
        @Res() res,
    ) {
        try {
            const orderHistoryId = parseInt(id, 10);
            const orderHistory = await this.orderHistoryService.findOne(orderHistoryId);
            if (!orderHistory) {
                this.responseService.sendNotFound(
                    res,
                    "Invalid OrderHistory Id",
                );
            }
            const data = await this.orderHistoryService.update(
                orderHistoryId,
                createOrderHistoryDto,
            );
            this.responseService.sendSuccess(
                res,
                'OrderHistory Updated Successfully',
                data,
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
        const orderId = parseInt(id, 10);
        try {


            await this.orderHistoryService.remove(orderId);
            this.responseService.sendSuccess(res, 'OrderHistory Deleted Successfully');
        } catch (error) {
            console.error(error);

            this.responseService.sendInternalError(
                res,
                'Something Went Wrong',
            );
        }
    }
}