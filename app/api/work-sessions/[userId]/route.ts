import { NextRequest, NextResponse } from 'next/server';
import { apiStore } from '@/src/lib/apiStore';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const userSessions = apiStore.workSessions.filter(
    (s) => s.userId === userId || s.userEmail === userId
  );
  const totalSeconds = userSessions.reduce((acc, s) => acc + s.durationSeconds, 0);

  return NextResponse.json({
    success: true,
    userId,
    count: userSessions.length,
    totalSeconds,
    sessions: userSessions,
  });
}
