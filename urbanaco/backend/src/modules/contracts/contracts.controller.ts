import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ContractsService } from './contracts.service';
@Controller('contracts')
export class ContractsController{
  constructor(private svc: ContractsService){}
  @Get() list(){ return this.svc.list(); }
  @Post('courier') createCourier(@Body() body:any){ return this.svc.createCourierContract(body); }
  @Post('restaurant') createRestaurant(@Body() body:any){ return this.svc.createRestaurantContract(body); }
  @Post(':id/terminate') end(@Param('id') id:string){ return this.svc.terminate(id); }
}
