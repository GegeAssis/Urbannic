import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
@Injectable()
export class FleetsService{
  constructor(private prisma: PrismaService){}
  async list(){ const shop = await this.prisma.tenant.findFirst({ where:{ type:'SHOP' }}); const fleets = await this.prisma.fleet.findMany({ where:{ shopTenantId: shop?.id } }); const join = await Promise.all(fleets.map(async f=>({ ...f, bikes: (await this.prisma.fleetBike.findMany({ where:{ fleetId: f.id } })).map(x=>x.bikeId) }))); return join; }
  async create(name:string){ const shop = await this.prisma.tenant.findFirst({ where:{ type:'SHOP' }}); if(!shop) throw new Error('Seed tenants first'); return this.prisma.fleet.create({ data:{ name, shopTenantId: shop.id, status:'ACTIVE' } }); }
  async addBike(fleetId:string, bikeId:string){ const bike = await this.prisma.bike.findUnique({ where:{ id: bikeId } }); if(!bike) throw new Error('Bike not found'); await this.prisma.fleetBike.upsert({ where:{ fleetId_bikeId:{ fleetId, bikeId } }, update:{}, create:{ fleetId, bikeId } }); return { ok:true }; }
}
