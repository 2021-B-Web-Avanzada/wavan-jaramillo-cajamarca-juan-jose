-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hospital" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Hospital" ("address", "createdAt", "description", "email", "id", "image", "name", "phone", "updatedAt", "website") SELECT "address", "createdAt", "description", "email", "id", "image", "name", "phone", "updatedAt", "website" FROM "Hospital";
DROP TABLE "Hospital";
ALTER TABLE "new_Hospital" RENAME TO "Hospital";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
