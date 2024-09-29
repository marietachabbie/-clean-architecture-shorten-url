import { NextFunction, Request, Response } from "express";
import { ShortenLongUrlUseCase } from "../../application/usecases/ShortenLongUrlUseCase";

class LongUrl {
  public constructor(
    public readonly content: string,
  ) {}
}

export class ShortenLongUrlController {
  public constructor (
    private readonly _useCase: ShortenLongUrlUseCase,
  ) {}

  public async handle (req: Request, res: Response, next: NextFunction) {
    try {
      const { longUrl } = req.body;
      const newLongUrl = new LongUrl(longUrl);
      const { shortUrl } = await this._useCase.execute(newLongUrl);
      res.status(201).json({ shortUrl });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
