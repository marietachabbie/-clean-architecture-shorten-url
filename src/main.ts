import { ApiServer } from "./presentation/ApiServer";
import { GetRedirectUrlUseCase } from "./application/usecases/GetRedirectUrlUseCase";
import { ShortenLongUrlUseCase } from "./application/usecases/ShortenLongUrlUseCase";
import { InMemoryUrlRepository } from "./infrastructure/InMemoryUrlRepository";
import { RedirectUrlController } from "./presentation/controllers/RedirectUrlController";
import { ShortenLongUrlController } from "./presentation/controllers/ShortenLongUrlController";

async function main () {

  const inMemoRepo = new InMemoryUrlRepository();
  const shortenUseCase = new ShortenLongUrlUseCase(inMemoRepo);
  const shortenController = new ShortenLongUrlController(shortenUseCase);

  const redirectUseCase = new GetRedirectUrlUseCase(inMemoRepo);
  const redirectController = new RedirectUrlController(redirectUseCase);

  const port = 3000;
  await ApiServer.run(port, shortenController, redirectController);
}

main();
