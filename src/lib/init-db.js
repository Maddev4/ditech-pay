import prisma from "./prisma.js";

async function main() {
  try {
    // You can add initial data here if needed
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
