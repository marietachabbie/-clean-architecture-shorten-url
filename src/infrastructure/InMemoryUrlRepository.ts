import { ShortenedUrl } from "../domain/entities/ShortenedUrl";
import { ShortUrl } from "../domain/entities/ShortUrl";

export class InMemoryUrlRepository {
  public constructor (
    private readonly _urls: Map<string, string> = new Map(),
  ) {}

  public save (shortened: ShortenedUrl): boolean {
    if (this._urls.has(shortened.shortUrl)) {
      throw new Error("Repeating key for short URL");
    }

    this._urls.set(shortened.shortUrl, shortened.longUrl);
    return true;
  }

  public find (url: ShortUrl): string | null {
    return this._urls.get(url.content) ?? null;
  }
}
