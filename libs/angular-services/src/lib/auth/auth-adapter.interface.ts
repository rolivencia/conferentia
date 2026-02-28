import { Observable } from 'rxjs';

/**
 * Framework-agnostic authentication adapter interface.
 * Implement this to decouple the application from a specific auth provider
 * (Auth0, Firebase Auth, Supabase, etc.).
 */
export interface AuthAdapter {
  /** Observable that emits the current authentication state */
  isAuthenticated$: Observable<boolean>;

  /** Triggers the login flow (e.g. redirect, popup) */
  loginWithRedirect(): void;

  /** Triggers the logout flow */
  logout(): void;
}
