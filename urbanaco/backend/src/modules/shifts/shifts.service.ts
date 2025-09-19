import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ShiftStatus } from '@prisma/client';
@Injectable()
export class ShiftsService{
  constructor(private prisma: PrismaService){}
  async list(){ const rest = await this.prisma.tenant.findFirst({ where:{ type:'RESTAURANT' }}); const rows = await this.prisma.shift.findMany({ where:{ tenantId: rest?.id }, orderBy:{ createdAt:'desc' }, include:{ courier:{ include:{ user:true } } } }); return rows.map(r=>({ id:r.id, courierName: r.courier?.user?.name ?? '—', status: r.status })); }
  async createFromJob(data:{ jobId:string; courierName:string }){ const rest = await this.prisma.tenant.findFirst({ where:{ type:'RESTAURANT' }}); if(!rest) throw new Error('Seed tenants first'); let user = await this.prisma.user.findFirst({ where:{ name: data.courierName } }); if(!user) user = await this.prisma.user.create({ data:{ name: data.courierName, email: `${Date.now()}@demo.local`, role:'COURIER' } }); let courier = await this.prisma.courier.findUnique({ where:{ id: user.id } }); if(!courier) courier = await this.prisma.courier.create({ data:{ id: user.id, city:'Ipatinga', user: { connect: { id: user.id } } } as any }); const open = await this.prisma.shift.count({ where:{ courierId: courier.id, status: { in:['IN_PROGRESS','PAUSED'] } } }); if(open>0) throw new BadRequestException('Courier já tem shift aberto'); return this.prisma.shift.create({ data:{ tenantId: rest.id, courierId: courier.id, jobId: data.jobId, status: ShiftStatus.PLANNED } }); }
}
