import { NextFunction, Request, Response } from "express";
import { GetRedirectUrlUseCase } from "../../application/usecases/GetRedirectUrlUseCase";

class ShortUrl {
  public constructor(
    public readonly content: string,
  ) {}
}

export class RedirectUrlController {
  public constructor (
    private readonly _useCase: GetRedirectUrlUseCase,
  ) {}

  public async handle (req: Request, res: Response, next: NextFunction) {
    try {
      const { url } = req.params;

      if (url.length !== 6) {
        throw new Error("Short URL must be of length 6");
      }

      const newShortUrl = new ShortUrl(url);
      const shortened = await this._useCase.execute(newShortUrl);
      res.redirect(shortened.longUrl);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
