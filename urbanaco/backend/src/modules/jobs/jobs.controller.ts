import { Body, Controller, Get, Post } from '@nestjs/common';
import { JobsService } from './jobs.service';
@Controller('jobs')
export class JobsController{
  constructor(private svc: JobsService){}
  @Get() list(){ return this.svc.list(); }
  @Post() create(@Body() body:any){ return this.svc.create(body); }
}
