import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';
@Module({ controllers:[BikesController], providers:[PrismaService, BikesService], exports:[BikesService] })
export class BikesModule{}
