-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hashedRefreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeetingSession" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "MeetingSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranscriptSegment" (
    "id" TEXT NOT NULL,
    "meetingSessionId" TEXT NOT NULL,
    "speakerIdentity" TEXT,
    "lang" TEXT NOT NULL,
    "startMs" INTEGER NOT NULL,
    "endMs" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TranscriptSegment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TranscriptArtifact" (
    "id" TEXT NOT NULL,
    "meetingSessionId" TEXT NOT NULL,
    "cleanedTranscript" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "decisions" JSONB NOT NULL,
    "actionItems" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TranscriptArtifact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Room_code_key" ON "Room"("code");

-- CreateIndex
CREATE UNIQUE INDEX "TranscriptArtifact_meetingSessionId_key" ON "TranscriptArtifact"("meetingSessionId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingSession" ADD CONSTRAINT "MeetingSession_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptSegment" ADD CONSTRAINT "TranscriptSegment_meetingSessionId_fkey" FOREIGN KEY ("meetingSessionId") REFERENCES "MeetingSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptArtifact" ADD CONSTRAINT "TranscriptArtifact_meetingSessionId_fkey" FOREIGN KEY ("meetingSessionId") REFERENCES "MeetingSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

