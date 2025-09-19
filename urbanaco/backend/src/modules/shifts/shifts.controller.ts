import { Body, Controller, Get, Post } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
@Controller('shifts')
export class ShiftsController{
  constructor(private svc: ShiftsService){}
  @Get() list(){ return this.svc.list(); }
  @Post() create(@Body() body:{ jobId:string; courierName:string }){ return this.svc.createFromJob(body); }
}
