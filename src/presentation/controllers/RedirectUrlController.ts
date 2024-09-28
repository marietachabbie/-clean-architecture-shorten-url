import { Request, Response } from "express";
import { GetRedirectUrlUseCase } from "../../application/usecases/GetRedirectUrlUseCase";

export class RedirectUrlController {
  public constructor (
    private readonly _useCase: GetRedirectUrlUseCase,
  ) {}

  public handle (req: Request, res: Response) {
    const { url } = req.params;
    const shortened = this._useCase.execute({ content: url });
    res.redirect(shortened.longUrl);
  }
}
