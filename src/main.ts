import { ApiServer } from "./presentation/ApiServer";
import { GetRedirectUrlUseCase } from "./application/usecases/GetRedirectUrlUseCase";
import { ShortenLongUrlUseCase } from "./application/usecases/ShortenLongUrlUseCase";
import { RedirectUrlController } from "./presentation/controllers/RedirectUrlController";
import { ShortenLongUrlController } from "./presentation/controllers/ShortenLongUrlController";
import { PrismaClient } from "@prisma/client";
import { PrismaUrlRepository } from "./infrastructure/PrismaUrlRepository";

async function main () {
  const client = new PrismaClient();
  const prismaRepo = new PrismaUrlRepository(client);

  const shortenUseCase = new ShortenLongUrlUseCase(prismaRepo);
  const shortenController = new ShortenLongUrlController(shortenUseCase);

  const redirectUseCase = new GetRedirectUrlUseCase(prismaRepo);
  const redirectController = new RedirectUrlController(redirectUseCase);

  const port = 3000;
  await ApiServer.run(port, shortenController, redirectController);
}

main();
