import { atomWithStorage } from 'jotai/utils';
import { User } from '../types/user';
export const currentUserAtom = atomWithStorage<User | null>('current_user', null);
export const isAuthenticatedAtom = atomWithStorage<boolean | null>('is_authenticated', false);
export const accessTokenAtom = atomWithStorage<string | null>('access_token', null);
