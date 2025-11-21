'use client';

import { useRouter } from 'next/navigation';

export function useSocialSignin() {
  const router = useRouter();
  const handleSignInWithGoogle = async () => {
    router.push('/api/auth/google');
  };
  return { handleSignInWithGoogle };
}
