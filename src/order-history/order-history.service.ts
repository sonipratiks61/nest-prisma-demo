import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderHistoryDto } from './dto/order-history.dto';

@Injectable()
export class OrderHistoryService {
    constructor(
        private prisma: PrismaService,) { }

    async create(createOrderHistoryDto: CreateOrderHistoryDto, ownerName: string) {
        const data = await this.prisma.orderHistory.create({
            data: {
                status: createOrderHistoryDto.status,
                ownerName: ownerName
            }
        });

        return data;
    }


    async findAll() {
        return await this.prisma.orderHistory.findMany()
    }

    async findOne(id: number) {
        return await this.prisma.orderHistory.findUnique({
            where: {
                id: id
            }
        })
    }

    async remove(id: number) {
        return await this.prisma.orderHistory.delete({
            where: {
                id: id
            }
        })
    }

    async update(id: number, createOrderHistoryDto: CreateOrderHistoryDto) {
        return await this.prisma.orderHistory.update({
            where: {
                id: id
            },
            data: {
                status: createOrderHistoryDto.status,

            }
        })
    }
}