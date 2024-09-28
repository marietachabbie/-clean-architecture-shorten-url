import { Router } from "express";
import { ShortenLongUrlController } from "../controllers/ShortenLongUrlController";

export const ShortenLongUrlRoute = (controller: ShortenLongUrlController): Router => {
  const router = Router();
  router.post("/", controller.handle.bind(controller));
  return router;
};
