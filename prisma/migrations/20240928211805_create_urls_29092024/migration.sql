-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "short" TEXT NOT NULL,
    "long" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_short_key" ON "Url"("short");
