import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
@Injectable()
export class BikesService{
  constructor(private prisma: PrismaService){}
  async list(){ const shop = await this.prisma.tenant.findFirst({ where:{ type:'SHOP' }}); return this.prisma.bike.findMany({ where:{ tenantId: shop?.id } }); }
  async create(data:any){ const shop = await this.prisma.tenant.findFirst({ where:{ type:'SHOP' }}); if(!shop) throw new Error('Seed tenants first'); return this.prisma.bike.create({ data:{ tenantId: shop.id, model:data.model, status:data.status??'AVAILABLE' } }); }
  update(id:string, data:any){ return this.prisma.bike.update({ where:{ id }, data }); }
  remove(id:string){ return this.prisma.bike.delete({ where:{ id } }); }
}
