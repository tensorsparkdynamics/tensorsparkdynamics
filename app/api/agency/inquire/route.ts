import { NextRequest, NextResponse } from 'next/server';
import { apiStore } from '@/src/lib/apiStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientName, email, company, serviceType, budgetRange, projectBrief, timeline } = body;

    if (!clientName || !email || !serviceType) {
      return NextResponse.json(
        { error: 'clientName, email, and serviceType are required.' },
        { status: 400 }
      );
    }

    const inquiry = {
      id: `NX-INQ-${Date.now().toString().slice(-6)}`,
      clientName: String(clientName).trim(),
      email: String(email).trim().toLowerCase(),
      company: company ? String(company).trim() : 'N/A',
      serviceType: String(serviceType),
      budgetRange: budgetRange || 'Flexible',
      projectBrief: projectBrief || 'Agency consultation request',
      timeline: timeline || 'Within 1-2 months',
      status: 'pending_review',
      createdAt: new Date().toISOString(),
    };

    apiStore.inquiries.unshift(inquiry);

    return NextResponse.json(
      {
        success: true,
        message: 'Agency consultation inquiry registered successfully',
        inquiry,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload' }, { status: 400 });
  }
}
