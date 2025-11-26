'use client';

const ACCESS_TOKEN_KEY = 'neoxmeet_access_token';
const REFRESH_TOKEN_KEY = 'neoxmeet_refresh_token';
const DISPLAY_NAME_KEY = 'neoxmeet_display_name';

export const getAccessToken = () => (typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_KEY) : null);
export const getRefreshToken = () => (typeof window !== 'undefined' ? localStorage.getItem(REFRESH_TOKEN_KEY) : null);
export const getDisplayName = () => (typeof window !== 'undefined' ? localStorage.getItem(DISPLAY_NAME_KEY) : null);

export const saveTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const saveDisplayName = (name: string) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DISPLAY_NAME_KEY, name);
};

export const clearAuth = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(DISPLAY_NAME_KEY);
};
