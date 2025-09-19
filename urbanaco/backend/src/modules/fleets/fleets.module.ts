import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FleetsController } from './fleets.controller';
import { FleetsService } from './fleets.service';
@Module({ controllers:[FleetsController], providers:[PrismaService, FleetsService], exports:[FleetsService] })
export class FleetsModule{}
