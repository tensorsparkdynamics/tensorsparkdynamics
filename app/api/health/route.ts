import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    framework: 'Next.js 16 (App Router) + TSX',
    service: 'Tensorspark Dynamics Autonomous Lab Engine',
    database: 'Firebase Firestore Enterprise',
    uptimeSeconds: Math.floor(process.uptime()),
  });
}
