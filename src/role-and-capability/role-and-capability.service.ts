import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleAndCapabilityDto } from './dto/role-and-capability.dto';
import { RoleAndCapabilityMapping } from '@prisma/client';
import { CapabilityService } from 'src/capabilities/capability.service';

@Injectable()
export class RoleAndCapabilityService {
  constructor(
    private prisma: PrismaService,
    private readonly capabilityService: CapabilityService,
  ) {}

  async create(
    roleAndCapabilityDto: RoleAndCapabilityDto,
  ): Promise<RoleAndCapabilityMapping[]> {
    try {
      const { roleId, capabilityIds } = roleAndCapabilityDto;

      if (capabilityIds.length == 0) {
        throw new Error(`At least the one capabilityIds`);
      }
      const existingRole = await this.prisma.role.findUnique({
        where: { id: roleId },
      });

      if (!existingRole) {
        throw new Error(`Role with ID ${roleId} not found.`);
      }

      const capabilities = await this.prisma.capability.findMany({
        where: { id: { in: capabilityIds } },
      });

      if (capabilities.length !== capabilityIds.length) {
        throw new Error('Invalid capability Ids');
      }

      const createdMappings: RoleAndCapabilityMapping[] = [];

      for (const capabilityId of capabilityIds) {
        const existingMapping =
          await this.prisma.roleAndCapabilityMapping.findFirst({
            where: {
              roleId,
              capabilityId,
            },
          });

        if (existingMapping) {
          throw new Error('Mapping already exists for roleId and capabilityId');
        }

        const createdMapping =
          await this.prisma.roleAndCapabilityMapping.create({
            data: {
              roleId,
              capabilityId,
            },
          });

        createdMappings.push(createdMapping);
      }

      return createdMappings;
    } catch (error) {
      console.error('Error creating RoleAndCapabilityMapping:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.roleAndCapabilityMapping.findMany({
      include: {
        role: true,
        capability: true,
      },
    });
  }

  async delete(
    roleAndCapabilityDto: RoleAndCapabilityDto,
  ): Promise<RoleAndCapabilityMapping[]> {
    try {
      const { roleId, capabilityIds } = roleAndCapabilityDto;

      let deletedEntries = [];

      for (const capabilityId of capabilityIds) {

        const checkCapability = await this.capabilityService.findOne(capabilityId);

        if(!checkCapability) {
          throw new Error('Invalid capability ID');
        }

        const data = await this.prisma.roleAndCapabilityMapping.delete({
          where: {
            capabilityId_roleId: { roleId, capabilityId },
          },
        });

        deletedEntries.push(data);
      }

      return deletedEntries;
    } catch (error) {
      console.error('Error deleting RoleAndCapabilityMapping:', error);
      throw error;
    }
  }
}
