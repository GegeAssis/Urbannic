import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
@Module({ controllers:[ShiftsController], providers:[PrismaService, ShiftsService], exports:[ShiftsService] })
export class ShiftsModule{}
