import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
// initialize Prisma Client
const prisma = new PrismaClient();
const attributes = [
  { name: 'service' },
  { name: 'printing' },
  { name: 'dieShape' },
  { name: 'textureType' },
  { name: 'paperQuality' },
  { name: 'colour' },
  { name: 'paperQuanlity' }, // Assuming it's not a typo, otherwise 'paperQuality' might be intended.
  { name: 'pocket' },
  { name: 'binding' },
  { name: 'envelopeCode' },
  { name: 'flapOpening' },
  { name: 'windowCutting' },
  { name: 'paperType' },
  { name: 'size' },
  { name: 'lamination' },
  { name: 'halfCut' },
  { name: 'firstPaperQuality' },
  { name: 'secondCopyPaperColor' },
  { name: 'thirdCopyPaperColor' },
  { name: 'stickersCountPerSheet' },
  { name: 'OpenType' },
];

async function main() {
  for (const attribute of attributes) {
    await prisma.attribute.upsert({
      where: { name: attribute.name },
      update: {}, // No need to update anything if it already exists
      create: {
        ...attribute,
        createdAt: new Date(), // Use the current date for createdAt
        updatedAt: new Date(), // Use the current date for updatedAt
      },
    });
  }
  // create two dummy articles
  await prisma.role.upsert({
    where: { name: 'User' },
    update: {}, // No need to update anything if it already exists
    create: {
      name: 'User',
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
  });

  await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {}, // No need to update anything if it already exists
    create: {
      name: 'Admin',
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
  });

  await prisma.capability.upsert({
    where: { name: 'getProfile' },
    update: {}, // No need to update anything if it already exists
    create: {
      name: 'getProfile',
      roleId: 1,
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
  });

  await prisma.capability.upsert({
    where: { name: 'forgetPassword' },
    update: {},
    create: {
      name: 'forgetPassword',
      roleId: 1,
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
  });

  await prisma.capability.upsert({
    where: { name: 'getProfile' },
    update: {}, // No need to update anything if it already exists
    create: {
      name: 'getProfile',
      roleId: 1,
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
  });

  await prisma.capability.upsert({
    where: { name: 'createAttachment' },
    update: {},
    create: {
      name: 'createAttachment',
      roleId: 1,
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
  });
  await prisma.capability.upsert({
    where: { name: 'createAttachment' },
    update: {},
    create: {
      name: 'deletedAttachment',
      roleId: 1,
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
  });
  const userData = {
    businessName: "John",
    name: "John",
    email: "user@gmail.com",
    mobileNumber: "1111111111",
    password: "password123",  // This should be replaced with the actual password input
    isActive: false,
    gstNumber: "1234567890",
    acceptTerms: true,
    roleId: 1,
    createdAt: new Date('2023-07-09'),
    updatedAt: new Date('2023-07-09'),
  };

  // Hash the password
  const hashedPassword1 = await bcrypt.hash(userData.password, 8);
  userData.password = hashedPassword1;

  
  const data = {
    businessName: "Admin",
    name: "Admin",
    email: "Admin@gmail.com",
    mobileNumber: "1212121212",
    password: "password123", 
    isActive: true,
    gstNumber: "1234567890",
    acceptTerms: true,
    roleId: 2,
    createdAt: new Date('2023-07-09'),
    updatedAt: new Date('2023-07-09'),
  };

  // Hash the password
  const hashedPassword2= await bcrypt.hash(data.password, 8);
  data.password = hashedPassword2;

await prisma.user.upsert({
    where: { email: userData.email },
    update: {
      ...userData,
      updatedAt: new Date(),  
    },
    create: userData,
  });
   await prisma.user.upsert({
    where: { email: data.email },
    update: {
      ...data,
      updatedAt: new Date(),
    },
    create: data,
  });
 
  await prisma.category.upsert({
    where: {
      id: 1
    },
    create: {
      name: "Category1",
      type: "service",
      description: "This is Category 1",
      userId: 1, // Replace with actual user ID
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
    update: {}
  })
  await prisma.category.upsert({
    where: {
      id: 2
    },
    create: {
      name: "SubCategory",
      type: "service",
      description: "This is subCategory 1",
      parentId:1,
      userId: 1, // Replace with actual user ID
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
    update: {}
  })
  await prisma.product.upsert({
    where: {
      id: 1
    },
    create: {
      name: "Product 1",
      isMeasurementRequired:true,
      isFitmentRequired:true,
      description: "This is product 1",
      categoryId:2,
      userId: 1,
      quantity:{
        type:"text",
        min:234,
        max:323
      },
      price:"3452",
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
    update: {}
  })
  await prisma.product.upsert({
    where: {
      id: 2
    },
    create: {
      name: "Product 2",
      isMeasurementRequired:true,
      isFitmentRequired:true,
      description: "This is product 2",
      categoryId:2,
      userId: 1,
      quantity:{
        type:"dropDown",
       options:[23,43,54]
      },
      price:"3452",
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),
    },
    update: {}
  })
  await prisma.productAttribute.upsert({
    where: {
      id: 1
    },
    create: {
      name: "ProductAttribute 1",
      productId:1,
      type:"dropDown",
       options:["23","43","54"],
    },
    update: {}
  })
  await prisma.productAttribute.upsert({
    where: {
      id: 2
    },
    create: {
      name: "ProductAttribute 2",
      productId:1,
      type:"text",
      
    },
    update: {}
  })
  await prisma.address.upsert({
    where: {
      id: 1
    },
    create: {
      address: "Shyam Hill",
      city:"Bhopal",
      pinCode:"462001",
      userId:1,
      state:"Madhya Pradesh",
      country:"India",
      createdAt: new Date('2023-07-09'),
      updatedAt: new Date('2023-07-09'),

      
    },
    update: {}
  })
  console.log('insert Successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
