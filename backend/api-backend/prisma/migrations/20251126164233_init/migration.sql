/*
  Warnings:

  - Added the required column `updatedAt` to the `MeetingSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MeetingSession" DROP CONSTRAINT "MeetingSession_roomId_fkey";

-- DropForeignKey
ALTER TABLE "TranscriptArtifact" DROP CONSTRAINT "TranscriptArtifact_meetingSessionId_fkey";

-- DropForeignKey
ALTER TABLE "TranscriptSegment" DROP CONSTRAINT "TranscriptSegment_meetingSessionId_fkey";

-- AlterTable
ALTER TABLE "MeetingSession" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "startedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "MeetingSession_roomId_idx" ON "MeetingSession"("roomId");

-- CreateIndex
CREATE INDEX "Room_ownerId_idx" ON "Room"("ownerId");

-- CreateIndex
CREATE INDEX "TranscriptSegment_meetingSessionId_idx" ON "TranscriptSegment"("meetingSessionId");

-- CreateIndex
CREATE INDEX "TranscriptSegment_meetingSessionId_startMs_idx" ON "TranscriptSegment"("meetingSessionId", "startMs");

-- AddForeignKey
ALTER TABLE "MeetingSession" ADD CONSTRAINT "MeetingSession_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptSegment" ADD CONSTRAINT "TranscriptSegment_meetingSessionId_fkey" FOREIGN KEY ("meetingSessionId") REFERENCES "MeetingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TranscriptArtifact" ADD CONSTRAINT "TranscriptArtifact_meetingSessionId_fkey" FOREIGN KEY ("meetingSessionId") REFERENCES "MeetingSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
