import { InjectionToken } from '@angular/core';
import { AuthAdapter } from './auth-adapter.interface';

/**
 * Injection token for the AuthAdapter.
 * Apps provide their own implementation (e.g. Auth0AuthAdapter).
 */
export const AUTH_ADAPTER = new InjectionToken<AuthAdapter>('AUTH_ADAPTER');
