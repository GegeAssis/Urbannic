import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FleetsService } from './fleets.service';
@Controller('fleets')
export class FleetsController{
  constructor(private svc: FleetsService){}
  @Get() list(){ return this.svc.list(); }
  @Post() create(@Body() body:{ name:string }){ return this.svc.create(body.name); }
  @Post(':id/add-bike') add(@Param('id') id:string, @Body() body:{ bikeId:string }){ return this.svc.addBike(id, body.bikeId); }
}
