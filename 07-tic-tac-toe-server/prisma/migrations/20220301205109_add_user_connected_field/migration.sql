/*
  Warnings:

  - Added the required column `isConnected` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `firebaseUID` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isConnected" BOOLEAN NOT NULL,
    "firebaseUID" TEXT NOT NULL,
    "photoURL" TEXT
);
INSERT INTO "new_User" ("email", "firebaseUID", "id", "lastName", "name", "nickname", "photoURL") SELECT "email", "firebaseUID", "id", "lastName", "name", "nickname", "photoURL" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
