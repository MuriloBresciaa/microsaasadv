import { atom } from 'nanostores';

/** Global UI lock — prevents interactions during async operations. */
export const isUiLocked = atom<boolean>(false);

/** Mobile navigation drawer state. */
export const isMobileMenuOpen = atom<boolean>(false);
