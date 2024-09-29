import { jest, it, describe, expect, beforeEach } from "@jest/globals";

import { ShortenLongUrlUseCase, generateShortUrl } from "./ShortenLongUrlUseCase";
import { ILongUrlRepository } from "../../domain/repositories/ILongUrlRepository";
import { ShortUrl } from "../../domain/entities/ShortUrl";
import { ShortenedUrl } from "../../domain/entities/ShortenedUrl";

describe("ShortenLongUrlUseCase", () => {
  let mockRepo: ILongUrlRepository;
  beforeEach(() => {
    mockRepo = {
      save: jest.fn()
        .mockReturnValue(true) as jest.MockedFunction<(url: ShortenedUrl) => Promise<boolean>>,
      find: jest.fn()
        .mockReturnValue(null) as jest.MockedFunction<(url: ShortUrl) => Promise<string | null>>,
    };
  });

  it("Generates 6-length URL", () => {
    const shortUrl = generateShortUrl();

    expect(typeof shortUrl).toBe("string");
    expect(shortUrl).toHaveLength(6);
  });

  it("Saves generated shortened URL", async () => {
    const useCase = new ShortenLongUrlUseCase(mockRepo);
    const longUrl = "https://url.com/very/ver/very/long/";
    const result = await useCase.execute({ content: longUrl });

    expect(result.longUrl).toBe(longUrl);
    expect(typeof result.shortUrl).toBe("string");
    expect(result.shortUrl).toHaveLength(6);
  });

  it("Throws an error when existing short URL was generated", async () => {
    mockRepo.find = jest.fn()
      .mockReturnValue("abdcef") as jest.MockedFunction<(url: ShortUrl) => Promise<string | null>>;

    const useCase = new ShortenLongUrlUseCase(mockRepo);
    const longUrl = "https://url.com/very/ver/very/long/";
    await expect(useCase.execute({ content: longUrl }))
      .rejects.toThrow("Repeating key for short URL");
  });

  it("Throws an error when unable to save the URL", async () => {
    mockRepo.save = jest.fn()
      .mockReturnValue(false) as jest.MockedFunction<(url: ShortenedUrl) => Promise<boolean>>;

    const useCase = new ShortenLongUrlUseCase(mockRepo);
    const longUrl = "https://url.com/very/ver/very/long/";
    await expect(useCase.execute({ content: longUrl }))
      .rejects.toThrow("Failed to store shortened URL");
  });
});
