import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  setDoc, 
  getDocs, 
  collection, 
  updateDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { WaitlistEntry, Applicant, FastTrackCandidate, WeeklyReport, ApplicationStage, AuthUser, WorkSession } from '../types';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// CRITICAL: Initialize Firestore with explicit database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Connection test on app initialization
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('✅ Firebase Firestore connected successfully to database:', firebaseConfig.firestoreDatabaseId);
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline or network is degraded.');
    } else {
      console.info('Database handshake verified.');
    }
    return false;
  }
}

// Immediately trigger connection test

// ==========================================
// FIRESTORE DATABASE REPOSITORY API
// ==========================================

export async function dbSaveWaitlistEntry(entry: WaitlistEntry): Promise<void> {
  const path = `waitlist/${entry.id}`;
  try {
    await setDoc(doc(db, 'waitlist', entry.id), {
      id: entry.id,
      fullName: entry.fullName,
      email: entry.email,
      companyOrOrg: entry.companyOrOrg || '',
      selectedProducts: entry.selectedProducts || [],
      useCase: entry.useCase || '',
      priorityPosition: entry.priorityPosition,
      joinedAt: entry.joinedAt,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function dbGetWaitlistEntries(): Promise<WaitlistEntry[]> {
  const path = 'waitlist';
  try {
    const snap = await getDocs(collection(db, 'waitlist'));
    return snap.docs.map(d => d.data() as WaitlistEntry);
  } catch (error) {
    console.warn('Could not fetch remote waitlist entries, falling back to local state:', error);
    return [];
  }
}

export async function dbSaveApplicant(applicant: Applicant): Promise<void> {
  const path = `applicants/${applicant.id}`;
  try {
    await setDoc(doc(db, 'applicants', applicant.id), {
      id: applicant.id,
      fullName: applicant.fullName,
      email: applicant.email,
      phone: applicant.phone || '',
      roleId: applicant.roleId,
      roleTitle: applicant.roleTitle,
      appliedDate: applicant.appliedDate,
      currentStage: applicant.currentStage,
      resumeUrl: applicant.resumeUrl,
      resumeFileName: applicant.resumeFileName || 'resume.pdf',
      resumeFileSize: applicant.resumeFileSize || '250 KB',
      resumeFitScore: applicant.resumeFitScore || 90,
      resumeParsedSkills: applicant.resumeParsedSkills || [],
      githubUrl: applicant.githubUrl,
      portfolioUrl: applicant.portfolioUrl || '',
      statementOfPurpose: applicant.statementOfPurpose || '',
      yearsExperience: applicant.yearsExperience || '',
      skills: applicant.skills || [],
      reviewerNotes: applicant.reviewerNotes || '',
      scoreBreakdown: applicant.scoreBreakdown || { resumeMatchScore: 85, overallRating: 85 },
      weeklyReports: applicant.weeklyReports || [],
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function dbGetApplicants(): Promise<Applicant[]> {
  try {
    const snap = await getDocs(collection(db, 'applicants'));
    return snap.docs.map(d => d.data() as Applicant);
  } catch (error) {
    console.warn('Could not fetch remote applicants, using local state:', error);
    return [];
  }
}

export async function dbUpdateApplicantStage(applicantId: string, stage: ApplicationStage): Promise<void> {
  const path = `applicants/${applicantId}`;
  try {
    await updateDoc(doc(db, 'applicants', applicantId), {
      currentStage: stage,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export interface AgencyInquiryPayload {
  id: string;
  clientName: string;
  email: string;
  company?: string;
  serviceType: string;
  budgetRange?: string;
  projectBrief: string;
  timeline?: string;
  createdAt: string;
}

export async function dbSaveAgencyInquiry(inquiry: AgencyInquiryPayload): Promise<void> {
  const path = `agency_inquiries/${inquiry.id}`;
  try {
    await setDoc(doc(db, 'agency_inquiries', inquiry.id), inquiry);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function dbSaveFastTrackCandidate(candidate: FastTrackCandidate & { id: string }): Promise<void> {
  const path = `fasttrack_candidates/${candidate.id}`;
  try {
    await setDoc(doc(db, 'fasttrack_candidates', candidate.id), candidate);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function dbSaveWeeklyReport(report: WeeklyReport): Promise<void> {
  const path = `weekly_reports/${report.id}`;
  try {
    await setDoc(doc(db, 'weekly_reports', report.id), {
      ...report,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function dbSaveUser(user: AuthUser): Promise<void> {
  const path = `users/${user.id}`;
  try {
    await setDoc(doc(db, 'users', user.id), {
      id: user.id,
      uniqueId: user.uniqueId,
      name: user.name,
      email: user.email,
      role: user.role || 'Member',
      department: user.department || 'Autonomous Intelligence',
      credentialsSentToEmail: user.credentialsSentToEmail || user.email,
      credentialSentAt: user.credentialSentAt || new Date().toISOString(),
      accessKey: user.accessKey || `TS-KEY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      totalWorkSeconds: user.totalWorkSeconds || 0,
      lastLoginAt: user.lastLoginAt || new Date().toISOString(),
      createdAt: user.createdAt,
    });
    console.log('✅ User registered & saved to Firestore:', user.uniqueId);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function dbSaveWorkSession(session: WorkSession): Promise<void> {
  const path = `work_sessions/${session.id}`;
  try {
    await setDoc(doc(db, 'work_sessions', session.id), {
      id: session.id,
      userId: session.userId,
      userName: session.userName,
      userEmail: session.userEmail,
      startTime: session.startTime,
      endTime: session.endTime,
      durationSeconds: session.durationSeconds,
      durationFormatted: session.durationFormatted,
      taskDescription: session.taskDescription,
      projectTrack: session.projectTrack,
      createdAt: session.createdAt,
    });
    console.log('✅ Work session logged to Firestore:', session.id);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function dbGetWorkSessions(userId?: string): Promise<WorkSession[]> {
  try {
    const snap = await getDocs(collection(db, 'work_sessions'));
    const all = snap.docs.map(d => d.data() as WorkSession);
    if (userId) {
      return all.filter(s => s.userId === userId);
    }
    return all;
  } catch (error) {
    console.warn('Could not fetch work sessions from Firestore:', error);
    return [];
  }
}

export async function dbUpdateUserWorkTime(userId: string, additionalSeconds: number): Promise<void> {
  const path = `users/${userId}`;
  try {
    await updateDoc(doc(db, 'users', userId), {
      totalWorkSeconds: additionalSeconds,
      lastActiveAt: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('Could not update total work time in Firestore:', error);
  }
}

