-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `activity` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `food` VARCHAR(191) NOT NULL,
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
