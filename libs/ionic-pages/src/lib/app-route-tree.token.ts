import { InjectionToken } from '@angular/core';

/**
 * Injection token for the app-specific route tree.
 * Each app provides its own route tree configuration
 * so shared pages can navigate without cross-app imports.
 */
export const APP_ROUTE_TREE_TOKEN = new InjectionToken<Record<string, string>>(
  'APP_ROUTE_TREE_TOKEN'
);
