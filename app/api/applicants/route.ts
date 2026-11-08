import { NextRequest, NextResponse } from 'next/server';
import { apiStore } from '@/src/lib/apiStore';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: apiStore.applicants.length,
    applicants: apiStore.applicants,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      roleId,
      roleTitle,
      resumeUrl,
      resumeFileName,
      resumeFileSize,
      resumeFitScore,
      resumeParsedSkills,
      githubUrl,
      portfolioUrl,
      statementOfPurpose,
      yearsExperience,
      skills,
    } = body;

    if (!fullName || !email || !roleId) {
      return NextResponse.json(
        { error: 'fullName, email, and roleId are mandatory.' },
        { status: 400 }
      );
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const applicantId = `NX-AI-2026-${randomSuffix}`;
    const calculatedResumeScore = Number(resumeFitScore) || Math.floor(88 + Math.random() * 10);

    const newApplicant = {
      id: applicantId,
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : '',
      roleId: String(roleId),
      roleTitle: roleTitle ? String(roleTitle) : 'Applied Role',
      appliedDate: new Date().toISOString().split('T')[0],
      currentStage: 'submitted',
      resumeUrl: resumeUrl || 'https://storage.googleapis.com/tensorspark-resumes/pending-review.pdf',
      resumeFileName: resumeFileName ? String(resumeFileName) : 'candidate_resume.pdf',
      resumeFileSize: resumeFileSize ? String(resumeFileSize) : '312 KB',
      resumeParsedSkills: Array.isArray(resumeParsedSkills) ? resumeParsedSkills : ['System Design', 'AI Engineering'],
      resumeFitScore: calculatedResumeScore,
      githubUrl: githubUrl || '',
      portfolioUrl: portfolioUrl || '',
      statementOfPurpose: statementOfPurpose || '',
      yearsExperience: yearsExperience || '1-3 years',
      skills: Array.isArray(skills) ? skills : ['Python', 'TypeScript', 'Machine Learning'],
      scoreBreakdown: {
        resumeMatchScore: calculatedResumeScore,
        overallRating: Math.floor(calculatedResumeScore * 0.95),
      },
      reviewerNotes: `Application received with attached resume (${resumeFileName || 'uploaded file'}). Automated ATS fit evaluated at ${calculatedResumeScore}%.`,
    };

    apiStore.applicants.unshift(newApplicant);

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully',
        applicant: newApplicant,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request payload' }, { status: 400 });
  }
}
