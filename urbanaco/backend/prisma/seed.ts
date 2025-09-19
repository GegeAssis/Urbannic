import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){
  const badges = [
    { code:'CERIO', name:'Cério', minXp:0, discountRate:0, colorHex:'#C4B7A6' },
    { code:'NEODIMIO', name:'Neodímio', minXp:500, discountRate:0.01, colorHex:'#7CA6D1' },
    { code:'ESCANDIO', name:'Escândio', minXp:1000, discountRate:0.02, colorHex:'#A6D4C4' },
    { code:'HOLMIO', name:'Hólmio', minXp:1500, discountRate:0.03, colorHex:'#B0A6D4' },
    { code:'LUTECIO', name:'Lutécio', minXp:2000, discountRate:0.05, colorHex:'#E0C274' },
  ];
  for(const b of badges) await prisma.badge.upsert({ where:{ code:b.code }, update:{}, create:b });
  const shop = await prisma.tenant.upsert({ where:{ id:'t_shop_demo' }, update:{}, create:{ id:'t_shop_demo', type:'SHOP', name:'Shop Demo', city:'Ipatinga' } });
  const rest = await prisma.tenant.upsert({ where:{ id:'t_rest_demo' }, update:{}, create:{ id:'t_rest_demo', type:'RESTAURANT', name:'Restaurante Demo', city:'Ipatinga' } });
  await prisma.bike.createMany({ data:[
    { tenantId: shop.id, model:'E-Bike 750Wh', status:'AVAILABLE' },
    { tenantId: shop.id, model:'E-Bike 900Wh', status:'AVAILABLE' },
    { tenantId: shop.id, model:'E-Bike 500Wh', status:'MAINTENANCE' },
  ], skipDuplicates:true });
  console.log('Seed OK');
}
main().finally(()=>prisma.$disconnect());
