-- Rename the column from definition to russianTranslation
ALTER TABLE "Word" ADD COLUMN "russianTranslation" TEXT;

-- Copy data from the old column to the new one
UPDATE "Word" SET "russianTranslation" = "definition";

-- Make the new column NOT NULL
ALTER TABLE "Word" ALTER COLUMN "russianTranslation" SET NOT NULL;

-- Drop the old column
ALTER TABLE "Word" DROP COLUMN "definition";