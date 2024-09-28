import express from "express";
import bodyParser from "body-parser";
import { ShortenLongUrlController } from "./controllers/ShortenLongUrlController";
import { RedirectUrlController } from "./controllers/RedirectUrlController";
import { ShortenLongUrlRoute } from "./routes/ShortenLongUrlRoute";
import { RedirectUrlRoute } from "./routes/RedirectUrlRoute";
import ErrorHandler from "./middlewares/ErrorHandler";

export class ApiServer {
  static async run (
    port: number,
    shortenUrlController: ShortenLongUrlController,
    redirectUrlController: RedirectUrlController,
  ) {
    const app = express();
    app.use(bodyParser.json());
    app.use("/api/url", ShortenLongUrlRoute(shortenUrlController));
    app.use("/shorturl", RedirectUrlRoute(redirectUrlController));

    app.use(ErrorHandler);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}
