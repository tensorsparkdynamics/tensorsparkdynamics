import { NextRequest, NextResponse } from 'next/server';
import { apiStore } from '@/src/lib/apiStore';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: apiStore.waitlist.length,
    entries: apiStore.waitlist,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, companyOrOrg, selectedProducts, useCase } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'fullName and email are required fields.' },
        { status: 400 }
      );
    }

    const newEntry = {
      id: `NX-WL-${100 + apiStore.waitlist.length + 1}`,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      companyOrOrg: companyOrOrg ? String(companyOrOrg).trim() : 'Enterprise Partner',
      selectedProducts: Array.isArray(selectedProducts) && selectedProducts.length > 0
        ? selectedProducts
        : ['AuraPersona AI Avatar'],
      useCase: useCase ? String(useCase).trim() : 'AI Product Early Access Evaluation',
      priorityPosition: apiStore.waitlist.length + 1,
      joinedAt: new Date().toISOString(),
    };

    apiStore.waitlist.push(newEntry);

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully registered for early access waitlist',
        entry: newEntry,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload' }, { status: 400 });
  }
}
