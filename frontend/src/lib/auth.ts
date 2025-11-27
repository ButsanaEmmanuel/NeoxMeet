'use client';

const ACCESS_TOKEN_KEY = 'neoxmeet_access_token';
const REFRESH_TOKEN_KEY = 'neoxmeet_refresh_token';
const DISPLAY_NAME_KEY = 'neoxmeet_display_name';

export const getAccessToken = (): string | null => (typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_KEY) : null);

export const getRefreshToken = (): string | null => (typeof window !== 'undefined' ? localStorage.getItem(REFRESH_TOKEN_KEY) : null);

export const getDisplayName = (): string | null => (typeof window !== 'undefined' ? localStorage.getItem(DISPLAY_NAME_KEY) : null);

export const saveTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const saveDisplayName = (name: string): void => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(DISPLAY_NAME_KEY, name);
};

export const clearAuth = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(DISPLAY_NAME_KEY);
};
