-- CreateTable
CREATE TABLE "Profil" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "avatar" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "bio" TEXT NOT NULL,

    CONSTRAINT "Profil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profil_userId_key" ON "Profil"("userId");

-- AddForeignKey
ALTER TABLE "Profil" ADD CONSTRAINT "Profil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
