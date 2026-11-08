import { NextResponse } from 'next/server';
import { apiStore } from '@/src/lib/apiStore';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: apiStore.inquiries.length,
    inquiries: apiStore.inquiries,
  });
}
