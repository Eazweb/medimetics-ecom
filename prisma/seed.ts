import { PrismaClient } from "../node_modules/.prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create a test admin user
    const hashedPassword = await hash("admin123", 12);
    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@test.com",
        password: hashedPassword,
        isAdmin: true,
      },
    });

    console.log("✅ Admin user created");

    // Create some test products
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: "Classic T-Shirt",
          description: "A comfortable cotton t-shirt",
          price: 29.99,
          mainImage: "https://example.com/tshirt.jpg",
          quantity: 100,
          otherImages: "https://example.com/tshirt-2.jpg",
          sizes: ["S", "M", "L", "XL"],
          colors: ["Black", "White", "Gray"],
          userId: admin.id,
          categories: {
            create: {
              name: "Clothing",
            },
          },
        },
      }),
      prisma.product.create({
        data: {
          name: "Denim Jeans",
          description: "Classic blue denim jeans",
          price: 59.99,
          mainImage: "https://example.com/jeans.jpg",
          quantity: 50,
          otherImages: "https://example.com/jeans-2.jpg",
          sizes: ["30", "32", "34", "36"],
          colors: ["Blue", "Black"],
          userId: admin.id,
          categories: {
            create: {
              name: "Pants",
            },
          },
        },
      }),
    ]);

    console.log(`✅ Created ${products.length} products`);
    console.log("🌱 Seeding completed successfully");
  } catch (error) {
    console.error("❌ Error seeding the database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("❌ Error seeding the database:", error);
  process.exit(1);
});
