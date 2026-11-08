import { NextRequest, NextResponse } from 'next/server';
import { apiStore } from '@/src/lib/apiStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      userName,
      userEmail,
      startTime,
      endTime,
      durationSeconds,
      durationFormatted,
      taskDescription,
      projectTrack,
    } = body;

    if (!userId || durationSeconds === undefined) {
      return NextResponse.json(
        { error: 'userId and durationSeconds are required.' },
        { status: 400 }
      );
    }

    const sessionId = `ws_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const newSession = {
      id: sessionId,
      userId: String(userId),
      userName: userName ? String(userName) : 'Tensorspark Member',
      userEmail: userEmail ? String(userEmail) : '',
      startTime: startTime || new Date(Date.now() - (durationSeconds * 1000)).toISOString(),
      endTime: endTime || new Date().toISOString(),
      durationSeconds: Number(durationSeconds),
      durationFormatted: durationFormatted || `${Math.floor(durationSeconds / 3600)}h ${Math.floor((durationSeconds % 3600) / 60)}m ${durationSeconds % 60}s`,
      taskDescription: taskDescription ? String(taskDescription).trim() : 'Active engineering & platform development',
      projectTrack: projectTrack || 'Autonomous Agents & Platform Core',
      createdAt: new Date().toISOString(),
    };

    apiStore.workSessions.unshift(newSession);

    const targetUser = apiStore.users.find(u => u.id === userId || u.uniqueId === userId);
    if (targetUser) {
      targetUser.totalWorkSeconds = (targetUser.totalWorkSeconds || 0) + Number(durationSeconds);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Work session logged and monitored successfully',
        session: newSession,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid work session payload' }, { status: 400 });
  }
}
