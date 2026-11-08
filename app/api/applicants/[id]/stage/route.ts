import { NextRequest, NextResponse } from 'next/server';
import { apiStore } from '@/src/lib/apiStore';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { stage } = body;

    const applicant = apiStore.applicants.find((a) => a.id === id);
    if (!applicant) {
      return NextResponse.json({ error: 'Applicant record not found' }, { status: 404 });
    }

    applicant.currentStage = stage;
    return NextResponse.json({
      success: true,
      message: `Applicant stage updated to ${stage}`,
      applicant,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid stage update request' }, { status: 400 });
  }
}
