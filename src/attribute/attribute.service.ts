import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAttributeDto } from './dto/attribute.dto';

@Injectable()
export class AttributeService {
  constructor(private prisma: PrismaService) { }

  async create(createAttributeDto: CreateAttributeDto) {
    return await this.prisma.attribute.create({
      data: {
        name: createAttributeDto.name,
      }

    })
  }

  async findOne(id: number) {
    return await this.prisma.attribute.findUnique({
      where: {
        id: id
      }
    })
  }

  async findAllAttribute() {
    return this.prisma.attribute.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }


  async update(id: number, createAttributeDto: CreateAttributeDto) {
    return await this.prisma.attribute.update({
      where: {
        id: id
      },
      data: {
        name: createAttributeDto.name
      }
    })
  }


  async delete(id: number) {
    return await this.prisma.attribute.delete({
      where: {
        id: id
      },
    })
  }
}
