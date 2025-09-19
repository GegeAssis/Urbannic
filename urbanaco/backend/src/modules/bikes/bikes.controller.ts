import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BikesService } from './bikes.service';
@Controller('bikes')
export class BikesController {
  constructor(private svc: BikesService){}
  @Get() list(){ return this.svc.list(); }
  @Post() create(@Body() body:any){ return this.svc.create(body); }
  @Patch(':id') update(@Param('id') id:string, @Body() body:any){ return this.svc.update(id, body); }
  @Delete(':id') remove(@Param('id') id:string){ return this.svc.remove(id); }
}
