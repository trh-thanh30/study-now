import { atomWithStorage } from 'jotai/utils';
import { User } from '../types/user';
export const currentUserAtom = atomWithStorage<User | null>('currentUser', null);
export const isAuthenticatedAtom = atomWithStorage<boolean | null>('isAuthenticated', false);
export const accessTokenAtom = atomWithStorage<string | null>('accessToken', null);
