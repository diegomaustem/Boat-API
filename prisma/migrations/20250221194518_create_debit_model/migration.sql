-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "status" SET DEFAULT 'paid';

-- CreateTable
CREATE TABLE "Debit" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Debit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Debit" ADD CONSTRAINT "Debit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
