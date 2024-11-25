-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "session" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "ttl" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_session_key" ON "Session"("session");
