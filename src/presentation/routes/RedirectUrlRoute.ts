import { Router } from "express";
import { RedirectUrlController } from "../controllers/RedirectUrlController";

export const RedirectUrlRoute = (controller: RedirectUrlController): Router => {
  const router = Router();
  router.get("/:url", controller.handle.bind(controller));
  return router;
};
