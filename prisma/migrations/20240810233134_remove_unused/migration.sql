/*
  Warnings:

  - You are about to drop the column `date` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `finishedAt` on the `Tasks` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT false,
    "user" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Tasks" ("description", "id", "isOpen", "priority", "title", "user") SELECT "description", "id", "isOpen", "priority", "title", "user" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
