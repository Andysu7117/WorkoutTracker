-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'LEGS', 'GLUTES', 'CORE', 'FULL_BODY', 'OTHER');

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "performedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "exerciseName" TEXT NOT NULL,
    "muscleGroup" "MuscleGroup" NOT NULL,
    "weight" DECIMAL(10,2),
    "reps" INTEGER,
    "durationSec" INTEGER,
    "setNumber" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Workout_userId_performedAt_idx" ON "Workout"("userId", "performedAt");

-- CreateIndex
CREATE INDEX "Set_workoutId_setNumber_idx" ON "Set"("workoutId", "setNumber");

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
