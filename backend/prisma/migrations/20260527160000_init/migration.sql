-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "TradeSide" AS ENUM ('yes', 'no');

-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('open', 'closed');

-- CreateEnum
CREATE TYPE "MarketLiquidity" AS ENUM ('low', 'medium', 'high');

-- CreateEnum
CREATE TYPE "MarketStatus" AS ENUM ('open', 'closed', 'resolved');

-- CreateEnum
CREATE TYPE "MarketCategory" AS ENUM ('sports', 'campus', 'academics', 'finance', 'entertainment');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBalance" (
    "userId" TEXT NOT NULL,
    "available" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "UserBalance_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Market" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "MarketCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "yesPrice" DOUBLE PRECISION NOT NULL,
    "noPrice" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "liquidity" "MarketLiquidity" NOT NULL,
    "closesAt" TIMESTAMP(3) NOT NULL,
    "status" "MarketStatus" NOT NULL,

    CONSTRAINT "Market_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketDetail" (
    "marketId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "yesOdds" DOUBLE PRECISION NOT NULL,
    "noOdds" DOUBLE PRECISION NOT NULL,
    "yesOddsChange" DOUBLE PRECISION NOT NULL,
    "noOddsChange" DOUBLE PRECISION NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "expiresIn" TEXT NOT NULL,
    "status" "MarketStatus" NOT NULL,
    "chartData" JSONB NOT NULL,

    CONSTRAINT "MarketDetail_pkey" PRIMARY KEY ("marketId")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marketId" TEXT,
    "marketTitle" TEXT NOT NULL,
    "side" "TradeSide" NOT NULL,
    "amountInvested" DOUBLE PRECISION NOT NULL,
    "sharePrice" DOUBLE PRECISION NOT NULL,
    "executedAt" TEXT NOT NULL,
    "status" "TradeStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserBalance" ADD CONSTRAINT "UserBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketDetail" ADD CONSTRAINT "MarketDetail_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "Market"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
