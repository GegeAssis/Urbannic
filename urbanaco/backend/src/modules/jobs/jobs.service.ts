import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
@Injectable()
export class JobsService{
  constructor(private prisma: PrismaService){}
  async list(){ const rest = await this.prisma.tenant.findFirst({ where:{ type:'RESTAURANT' }}); return this.prisma.restaurantJob.findMany({ where:{ tenantId: rest?.id }, orderBy:{ createdAt:'desc' } }); }
  async create(data:{ title:string; shiftType:string; slots:number; startDate:string; endDate:string; remuneration:number }){ const rest = await this.prisma.tenant.findFirst({ where:{ type:'RESTAURANT' }}); if(!rest) throw new Error('Seed tenants first'); return this.prisma.restaurantJob.create({ data:{ tenantId: rest.id, shiftType:data.shiftType, slots:data.slots, startDate: new Date(data.startDate), endDate: new Date(data.endDate), remuneration: data.remuneration, title: data.title ?? 'Turno' } }); }
}
