import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx conditionals.
 * Standard utility used by all Shadcn/UI components.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Cross-browser clipboard copy with iOS/Safari fallback.
 *
 * Strategy:
 * 1. Try the modern Clipboard API (Chrome, Firefox, Edge — requires HTTPS or localhost)
 * 2. Fallback: createRange() + addRange() + execCommand('copy') for iOS/Safari
 *    iOS restricts navigator.clipboard in non-HTTPS/non-user-gesture contexts,
 *    so the legacy execCommand approach is necessary.
 *
 * @param text - The string to copy to the clipboard
 * @returns Promise<boolean> - true on success, false on failure
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // --- Strategy 1: Modern Async Clipboard API ---
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy strategy
    }
  }

  // --- Strategy 2: Legacy execCommand fallback (iOS 14-, Safari, older browsers) ---
  try {
    const textArea = document.createElement('textarea');

    // Make it as invisible as possible without using display:none or visibility:hidden
    // (iOS Safari refuses to copy from hidden elements)
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    textArea.setAttribute('aria-hidden', 'true');
    textArea.setAttribute('tabindex', '-1');

    document.body.appendChild(textArea);

    // iOS-specific: use createRange + addRange instead of .select()
    const range = document.createRange();
    range.selectNodeContents(textArea);

    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // iOS Safari requires setSelectionRange AFTER addRange
    textArea.setSelectionRange(0, textArea.value.length);

    const success = document.execCommand('copy');
    document.body.removeChild(textArea);

    return success;
  } catch {
    return false;
  }
}
