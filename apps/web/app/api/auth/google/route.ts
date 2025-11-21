import { NextResponse } from 'next/server';

export function GET() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  const redirectUri = `${backendUrl}/auth/google/callback`;
  return NextResponse.redirect(`${redirectUri}`);
}
