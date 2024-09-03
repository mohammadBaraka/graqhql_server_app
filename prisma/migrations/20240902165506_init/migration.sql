-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PostCategory" (
    "postId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    PRIMARY KEY ("postId", "categoryId"),
    CONSTRAINT "PostCategory_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PostCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PostCategory" ("categoryId", "postId") SELECT "categoryId", "postId" FROM "PostCategory";
DROP TABLE "PostCategory";
ALTER TABLE "new_PostCategory" RENAME TO "PostCategory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
