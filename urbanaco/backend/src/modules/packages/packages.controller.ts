import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PackagesService } from './packages.service';
@Controller()
export class PackagesController{
  constructor(private svc: PackagesService){}
  @Get('shifts/:id/packages') list(@Param('id') id:string){ return this.svc.listByShift(id); }
  @Post('shifts/:id/packages') create(@Param('id') id:string, @Body() body:any){ return this.svc.create(id, body); }
  @Post('packages/:id/advance') advance(@Param('id') id:string){ return this.svc.advance(id); }
}
