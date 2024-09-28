import { ILongUrlRepository } from "../../domain/repositories/ILongUrlRepository";
import { IShortenedUrlResult } from "../repositories/IShortenedUrlResult";
import { IShortUrlDto } from "../repositories/IShortUrlDto";
import { IUseCase } from "../repositories/IUseCase";

class ShortUrl {
  public constructor (
    public readonly content: string,
  ) {}
}

export class GetRedirectUrlUseCase
implements IUseCase<IShortUrlDto, IShortenedUrlResult> {

  public constructor (
    private readonly _repo: ILongUrlRepository,
  ) {}

  public execute (input: IShortUrlDto): IShortenedUrlResult {
    const shortUrl = new ShortUrl(input.content);
    const result = this._repo.find(shortUrl);

    if (!result) {
      throw new Error(`Failed to find redirect URL by the short URL: ${shortUrl.content}`);
    }

    return {
      shortUrl: shortUrl.content,
      longUrl: result,
    };
  }
}
