import { ShortenedUrl } from "../entities/ShortenedUrl";
import { ShortUrl } from "../entities/ShortUrl";

export interface ILongUrlRepository {
  save (shortened: ShortenedUrl): boolean,
  find (short: ShortUrl): string | null,
}
