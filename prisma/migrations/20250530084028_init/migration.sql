/*
  Warnings:

  - The primary key for the `Food` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `food` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Food` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `foodId` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foodName` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Food` DROP PRIMARY KEY,
    DROP COLUMN `food`,
    DROP COLUMN `id`,
    ADD COLUMN `foodId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `foodName` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`foodId`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- CreateTable
CREATE TABLE `MealLog` (
    `MealLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `mealType` ENUM('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK') NOT NULL,
    `notes` VARCHAR(191) NULL,

    PRIMARY KEY (`MealLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MealLogItem` (
    `MealLogItemid` INTEGER NOT NULL AUTO_INCREMENT,
    `mealLogId` INTEGER NOT NULL,
    `foodId` INTEGER NOT NULL,
    `quantity` DOUBLE NOT NULL,

    PRIMARY KEY (`MealLogItemid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MealLog` ADD CONSTRAINT `MealLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealLogItem` ADD CONSTRAINT `MealLogItem_mealLogId_fkey` FOREIGN KEY (`mealLogId`) REFERENCES `MealLog`(`MealLogId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealLogItem` ADD CONSTRAINT `MealLogItem_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Food`(`foodId`) ON DELETE RESTRICT ON UPDATE CASCADE;
