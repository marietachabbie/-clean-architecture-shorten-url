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
implements IUseCase<IShortUrlDto, Promise<IShortenedUrlResult>> {

  public constructor (
    private readonly _repo: ILongUrlRepository,
  ) {}

  public async execute (input: IShortUrlDto): Promise<IShortenedUrlResult> {
    const shortUrl = new ShortUrl(input.content);
    const result = await this._repo.find(shortUrl);

    if (!result) {
      throw new Error(`No URL found by privided short URL: ${shortUrl.content}`);
    }

    return {
      shortUrl: shortUrl.content,
      longUrl: result,
    };
  }
}
