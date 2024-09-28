import { ILongUrlRepository } from "../../domain/repositories/ILongUrlRepository";
import { ILongUrlDto } from "../repositories/ILongUrlDto";
import { IShortenedUrlResult } from "../repositories/IShortenedUrlResult";
import { IUseCase } from "../repositories/IUseCase";

export class ShortenLongUrlUseCase
implements IUseCase<ILongUrlDto, IShortenedUrlResult> {

  public constructor(
    private readonly _repo: ILongUrlRepository,
  ) {}

  public execute (url: ILongUrlDto): IShortenedUrlResult {
    const shortened = (Math.random() + 1).toString(36).slice(2, 8);
    if (shortened.length !== 6) {
      throw new Error("Failed to generate 6 length string");
    }

    const result: IShortenedUrlResult = {
      shortUrl: shortened,
      longUrl: url.content,
    };

    this._repo.save(result);
    return { longUrl: url.content, shortUrl: shortened };
  }
}
