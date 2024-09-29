import { ShortenedUrl } from "../entities/ShortenedUrl";
import { ShortUrl } from "../entities/ShortUrl";

export interface ILongUrlRepository {
  save (shortened: ShortenedUrl): Promise<boolean>,
  find (short: ShortUrl): Promise<string | null>,
}
