import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PackageStatus } from '@prisma/client';
const FLOW: PackageStatus[] = ['PREPARING','AWAITING_COURIER','PICKED_UP','EN_ROUTE','DELIVERED'];
@Injectable()
export class PackagesService{
  constructor(private prisma: PrismaService){}
  listByShift(shiftId:string){ return this.prisma.deliveryPackage.findMany({ where:{ shiftId }, orderBy:{ createdAt:'desc' } }); }
  create(shiftId:string, data:any){ return this.prisma.deliveryPackage.create({ data:{ shiftId, status:'PREPARING', ...data } }); }
  async advance(id:string){ const p = await this.prisma.deliveryPackage.findUnique({ where:{ id } }); if(!p) throw new BadRequestException('Package not found'); if(p.status==='DELIVERED' || p.status==='FAILED') return p; const idx = FLOW.indexOf(p.status as PackageStatus); const next = FLOW[Math.min(idx+1, FLOW.length-1)]; return this.prisma.deliveryPackage.update({ where:{ id }, data:{ status: next } }); }
}
