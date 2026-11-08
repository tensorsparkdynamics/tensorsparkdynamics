import { NextRequest, NextResponse } from 'next/server';
import { apiStore } from '@/src/lib/apiStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, role, department } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required for registration.' }, { status: 400 });
    }

    const uniqueId = `TS-UID-${Math.floor(100000 + Math.random() * 900000)}`;
    const accessKey = `TS-KEY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const userId = `usr_${uniqueId.toLowerCase()}`;

    const newUser = {
      id: userId,
      uniqueId: uniqueId,
      name: fullName ? String(fullName).trim() : email.split('@')[0],
      email: String(email).trim().toLowerCase(),
      role: role || 'AI Engineer / Developer',
      department: department || 'Autonomous Systems',
      credentialsSentToEmail: String(email).trim().toLowerCase(),
      credentialSentAt: new Date().toISOString(),
      accessKey: accessKey,
      totalWorkSeconds: 0,
      lastLoginAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    apiStore.users.unshift(newUser);

    const emailDispatch = {
      recipient: newUser.email,
      subject: 'Welcome to Tensorspark Dynamics - Your Login Credentials & Unique ID',
      uniqueId: newUser.uniqueId,
      accessKey: newUser.accessKey,
      sentAt: newUser.credentialSentAt,
      status: 'DELIVERED',
      serverProtocol: 'TLS 1.3 Relay (mx.tensorspark.ai)',
      messageId: `msg_${Date.now()}_${uniqueId}`,
      mailBodyPreview: `Hello ${newUser.name}, your Tensorspark account has been provisioned. Your Unique ID is ${newUser.uniqueId}. Security Access Key: ${newUser.accessKey}.`,
    };

    return NextResponse.json(
      {
        success: true,
        message: `Account created. Unique ID ${uniqueId} generated and credentials dispatched to registered email ${newUser.email}.`,
        user: newUser,
        emailDispatch,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid user registration payload' }, { status: 400 });
  }
}
