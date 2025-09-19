import { Module } from '@nestjs/common';
import { BikesModule } from './bikes/bikes.module';
import { FleetsModule } from './fleets/fleets.module';
import { ContractsModule } from './contracts/contracts.module';
import { JobsModule } from './jobs/jobs.module';
import { ShiftsModule } from './shifts/shifts.module';
import { PackagesModule } from './packages/packages.module';
@Module({ imports: [BikesModule, FleetsModule, ContractsModule, JobsModule, ShiftsModule, PackagesModule] })
export class AppModule {}
