import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { getServerSession } from "#auth";

let prisma: PrismaClient;

declare module "h3" {
  interface H3EventContext {
    prisma: PrismaClient;
    user: Session | null;
  }
}

export default eventHandler(async (event) => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  const session = await getServerSession(event);
  event.context.user = session;
  event.context.prisma = prisma;
});
