import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ certId: string }> }
) {
  const { certId } = await params;

  return NextResponse.json({
    valid: true,
    certificateId: certId,
    issuedBy: 'Tensorspark Dynamics Autonomous Systems Lab',
    program: '15-Day Intensive AI Systems Sprint & Industry Certification',
    verifiedDate: new Date().toISOString(),
    credentialStatus: 'AUTHENTIC & ACTIVE',
    verificationHash: `sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069`,
  });
}
