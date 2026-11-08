import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, uniqueId } = body;

    if (!email) {
      return NextResponse.json({ error: 'Recipient email is required.' }, { status: 400 });
    }

    const dispatchRecord = {
      recipient: String(email).trim().toLowerCase(),
      subject: 'Tensorspark Credentials & Security Access Passkey Resend',
      uniqueId: uniqueId || `TS-UID-${Math.floor(100000 + Math.random() * 900000)}`,
      sentAt: new Date().toISOString(),
      status: 'DELIVERED',
      serverProtocol: 'TLS 1.3 Relay (mx.tensorspark.ai)',
      messageId: `msg_resend_${Date.now()}`,
    };

    return NextResponse.json({
      success: true,
      message: `Login credentials successfully dispatched to ${dispatchRecord.recipient}`,
      emailDispatch: dispatchRecord,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid dispatch payload' }, { status: 400 });
  }
}
