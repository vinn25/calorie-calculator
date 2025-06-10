-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `activity` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `calorieTarget` INTEGER NOT NULL,
    `proteinTarget` DOUBLE NOT NULL,
    `fatTarget` DOUBLE NOT NULL,
    `carbTarget` DOUBLE NOT NULL,
    `goal` VARCHAR(191) NOT NULL DEFAULT 'standard',
    `vitaminCTarget` DOUBLE NOT NULL,
    `calciumTarget` DOUBLE NOT NULL,
    `ironTarget` DOUBLE NOT NULL,
    `vitaminDTarget` DOUBLE NOT NULL,
    `potassiumTarget` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food` (
    `foodId` INTEGER NOT NULL AUTO_INCREMENT,
    `foodName` VARCHAR(191) NOT NULL,
    `caloricvalue` DOUBLE NOT NULL,
    `fat` DOUBLE NOT NULL,
    `saturatedfats` DOUBLE NOT NULL,
    `monounsaturatedfats` DOUBLE NOT NULL,
    `polyunsaturatedfats` DOUBLE NOT NULL,
    `carbohydrates` DOUBLE NOT NULL,
    `sugars` DOUBLE NOT NULL,
    `protein` DOUBLE NOT NULL,
    `dietaryfiber` DOUBLE NOT NULL,
    `cholesterol` DOUBLE NOT NULL,
    `sodium` DOUBLE NOT NULL,
    `water` DOUBLE NOT NULL,
    `vitamina` DOUBLE NOT NULL,
    `vitaminb1` DOUBLE NOT NULL,
    `vitaminb11` DOUBLE NOT NULL,
    `vitaminb12` DOUBLE NOT NULL,
    `vitaminb2` DOUBLE NOT NULL,
    `vitaminb3` DOUBLE NOT NULL,
    `vitaminb5` DOUBLE NOT NULL,
    `vitaminb6` DOUBLE NOT NULL,
    `vitaminc` DOUBLE NOT NULL,
    `vitamind` DOUBLE NOT NULL,
    `vitamine` DOUBLE NOT NULL,
    `vitamink` DOUBLE NOT NULL,
    `calcium` DOUBLE NOT NULL,
    `copper` DOUBLE NOT NULL,
    `iron` DOUBLE NOT NULL,
    `magnesium` DOUBLE NOT NULL,
    `manganese` DOUBLE NOT NULL,
    `phosphorus` DOUBLE NOT NULL,
    `potassium` DOUBLE NOT NULL,
    `selenium` DOUBLE NOT NULL,
    `zinc` DOUBLE NOT NULL,
    `nutritiondensity` DOUBLE NOT NULL,

    PRIMARY KEY (`foodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `FavoriteFood` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `foodId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `FavoriteFood_userId_foodId_key`(`userId`, `foodId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MealLog` ADD CONSTRAINT `MealLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealLogItem` ADD CONSTRAINT `MealLogItem_mealLogId_fkey` FOREIGN KEY (`mealLogId`) REFERENCES `MealLog`(`MealLogId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MealLogItem` ADD CONSTRAINT `MealLogItem_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Food`(`foodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteFood` ADD CONSTRAINT `FavoriteFood_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FavoriteFood` ADD CONSTRAINT `FavoriteFood_foodId_fkey` FOREIGN KEY (`foodId`) REFERENCES `Food`(`foodId`) ON DELETE RESTRICT ON UPDATE CASCADE;
