// import { Injectable, NotFoundException } from '@nestjs/common';


import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemsDto } from './dto/create-order-Item.dto';
import { validate } from 'class-validator';

@Injectable()
export class OrderItemsService {
    constructor(private productService: ProductService,
        private prisma: PrismaService) {
    }
    
    async orderItemsSearchByOrderId(orderId: number) {

        const checkOrderIdExist = await this.prisma.orderItem.findFirst({
            where: {
                orderId: orderId
            }
        })
        if (!checkOrderIdExist) {
            throw new NotFoundException("Invalid Order Id")
        }
        const data = await this.prisma.orderItem.findMany({
            where: {
                orderId: orderId
            },

        })
        return data;
    }

    async findAll() {
        return await this.prisma.orderItem.findMany({
            include: {
                product: true
            }
        })
    }

    async findOne(id: number) {

        return await this.prisma.orderItem.findUnique({
            where: {
                id: id
            }
        })
    }
    async remove(id: number) {
        return await this.prisma.orderItem.delete({
            where: {
                id: id
            }
        })
    }
    // async update(id: number, createOrderItemDto: CreateOrderItemsDto) {
    //     const attributes = createOrderItemDto.attributes.map(attr => ({
    //         name: attr.name,
    //         value: attr.value,
    //     }));
    //     return await this.prisma.orderItem.update({
    //         where: {
    //             id: id
    //         },
    //         data: {
    //             quantity: createOrderItemDto.quantity,
    //             name: createOrderItemDto.name,
    //             price: createOrderItemDto.price,
    //             productId: createOrderItemDto.productId,
    //             attributes: {
    //                 set: attributes
    //             }

    //         }
    //     })
    // }
}
