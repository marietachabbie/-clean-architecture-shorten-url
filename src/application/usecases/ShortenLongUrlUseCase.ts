import { ILongUrlRepository } from "../../domain/repositories/ILongUrlRepository";
import { ILongUrlDto } from "../repositories/ILongUrlDto";
import { IShortenedUrlResult } from "../repositories/IShortenedUrlResult";
import { IUseCase } from "../repositories/IUseCase";

class ShortUrl {
  public constructor(
    public readonly content: string,
  ) {}
}

export class ShortenLongUrlUseCase
implements IUseCase<ILongUrlDto, Promise<IShortenedUrlResult>> {

  public constructor(
    private readonly _repo: ILongUrlRepository,
  ) {}

  public async execute (url: ILongUrlDto): Promise<IShortenedUrlResult> {
    const shortened = (Math.random() + 1).toString(36).slice(2, 8);
    if (shortened.length !== 6) {
      throw new Error("Failed to generate 6 length string");
    }

    const result: IShortenedUrlResult = {
      shortUrl: shortened,
      longUrl: url.content,
    };

    // TODO: Recursively call untill non-existing generated
    const newShortUrl = new ShortUrl(shortened);
    const existing = await this._repo.find(newShortUrl);

    if (existing) {
      throw new Error("Repeating key for short URL");
    }

    await this._repo.save(result);
    return { longUrl: url.content, shortUrl: shortened };
  }
}
