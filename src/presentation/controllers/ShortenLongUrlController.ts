import { Request, Response } from "express";
import { ShortenLongUrlUseCase } from "../../application/usecases/ShortenLongUrlUseCase";

export class ShortenLongUrlController {
  public constructor (
    private readonly _useCase: ShortenLongUrlUseCase,
  ) {}

  public handle (req: Request, res: Response) {
    const { longUrl } = req.body;
    const { shortUrl } = this._useCase.execute({ content: longUrl });
    res.status(201).json({ shortUrl });
  }
}
