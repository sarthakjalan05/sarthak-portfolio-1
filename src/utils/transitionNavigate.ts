import { NavigateFunction } from 'react-router-dom';

/**
 * Safely navigates using View Transitions API when supported by the browser,
 * falling back gracefully to standard navigation without polyfills.
 */
export const navigateWithViewTransition = (navigate: NavigateFunction, to: string) => {
  if (
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    typeof (document as any).startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    (document as any).startViewTransition(() => {
      navigate(to);
    });
  } else {
    navigate(to);
  }
};
