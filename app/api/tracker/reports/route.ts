import { NextRequest, NextResponse } from 'next/server';
import { apiStore } from '@/src/lib/apiStore';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: apiStore.reports.length,
    reports: apiStore.reports,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { weekNumber, title, milestoneCompleted, deliverables, hoursLogged, rating } = body;

    const newReport = {
      id: `wk-${apiStore.reports.length + 1}`,
      weekNumber: Number(weekNumber) || apiStore.reports.length + 1,
      title: String(title || `Week ${apiStore.reports.length + 1} Milestone Delivery`),
      dates: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      milestoneCompleted: String(milestoneCompleted || 'Completed planned core development milestones.'),
      deliverables: Array.isArray(deliverables) ? deliverables : ['Automated CI/CD Integration', 'Test suite passes'],
      hoursLogged: Number(hoursLogged) || 40,
      supervisorFeedback: 'Milestone verified and logged into engineering tracker.',
      rating: Number(rating) || 5,
      status: 'approved',
    };

    apiStore.reports.unshift(newReport);

    return NextResponse.json(
      {
        success: true,
        message: 'Weekly progress report logged successfully',
        report: newReport,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid report data payload' }, { status: 400 });
  }
}
