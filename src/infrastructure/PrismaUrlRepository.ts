import { ShortenedUrl } from "../domain/entities/ShortenedUrl";
import { ShortUrl } from "../domain/entities/ShortUrl";
import { PrismaClient } from "@prisma/client";
import { ILongUrlRepository } from "../domain/repositories/ILongUrlRepository";

export class PrismaUrlRepository implements ILongUrlRepository {
  public constructor(
    private readonly _client: PrismaClient,
  ) {}

  public async save (url: ShortenedUrl): Promise<boolean> {
    await this._client.url.create({
      data: {
        id: Date.now().toString(),
        short: url.shortUrl,
        long: url.longUrl,
      },
    });

    return true;
  }

  public async find (url: ShortUrl): Promise<string | null> {
    const result = await this._client.url.findFirst({
      where: {
        short: url.content,
      },
    });

    return result ? result.long : null;
  }
}
