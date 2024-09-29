import { jest, it, describe, expect, beforeEach } from "@jest/globals";
import { GetRedirectUrlUseCase } from "./GetRedirectUrlUseCase";
import { ILongUrlRepository } from "../../domain/repositories/ILongUrlRepository";
import { ShortenedUrl } from "../../domain/entities/ShortenedUrl";
import { ShortUrl } from "../../domain/entities/ShortUrl";

describe("GetRedirectUrlUseCase", () => {
  let mockRepo: ILongUrlRepository;
  const longUrl = "https://url.com/very/ver/very/long/";
  const shortUrl = "abcdef";

  beforeEach(() => {
    mockRepo = {
      save: jest.fn()
        .mockReturnValue(true) as jest.MockedFunction<(url: ShortenedUrl) => Promise<boolean>>,
      find: jest.fn()
        .mockReturnValue(longUrl) as jest.MockedFunction<(url: ShortUrl) => Promise<string | null>>,
    };
  });

  it("Gets redirect (i.e: long) URL for given short URL", async () => {
    const useCase = new GetRedirectUrlUseCase(mockRepo);
    const result = await useCase.execute({ content: shortUrl });
    expect(result.shortUrl).toBe(shortUrl);
    expect(result.longUrl).toBe(longUrl);
  });

  it("Throws no found error when invalid short URL provided", async () => {
    mockRepo.find = jest.fn()
      .mockReturnValue(null) as jest.MockedFunction<(url: ShortUrl) => Promise<string | null>>;

    const useCase = new GetRedirectUrlUseCase(mockRepo);
    await expect(useCase.execute({ content: "ghijkl" }))
      .rejects.toThrow("No URL found by privided short URL: ghijkl");
  });
});
